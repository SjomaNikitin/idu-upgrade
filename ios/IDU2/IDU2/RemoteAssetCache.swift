import Foundation

/// Downloads text assets and keeps the last successful response for offline use.
struct RemoteAssetCache {
    enum Source: String, Sendable {
        case network
        case diskCache
    }

    struct Asset: Sendable {
        let text: String
        let source: Source
    }

    enum CacheError: LocalizedError {
        case invalidResponse(URL, Int)
        case invalidText(URL)
        case unavailable(URL, downloadError: Error, cacheError: Error)

        var errorDescription: String? {
            switch self {
            case let .invalidResponse(url, statusCode):
                return "Asset request for \(url.absoluteString) returned HTTP \(statusCode)"
            case let .invalidText(url):
                return "Asset at \(url.absoluteString) was not valid UTF-8"
            case let .unavailable(url, downloadError, cacheError):
                return "Asset at \(url.absoluteString) could not be downloaded (\(downloadError.localizedDescription)) or read from cache (\(cacheError.localizedDescription))"
            }
        }
    }

    private let session: URLSession
    private let fileManager: FileManager
    private let cacheDirectory: URL

    init(
        session: URLSession = .shared,
        fileManager: FileManager = .default,
        cacheDirectory: URL? = nil
    ) {
        self.session = session
        self.fileManager = fileManager
        self.cacheDirectory = cacheDirectory ?? Self.defaultCacheDirectory(using: fileManager)
    }

    func loadText(from url: URL, cacheFileName: String) async throws -> Asset {
        do {
            let text = try await downloadText(from: url)
            try save(text, as: cacheFileName)
            return Asset(text: text, source: .network)
        } catch let downloadError {
            do {
                return Asset(
                    text: try read(cacheFileName: cacheFileName, sourceURL: url),
                    source: .diskCache
                )
            } catch let cacheError {
                throw CacheError.unavailable(
                    url,
                    downloadError: downloadError,
                    cacheError: cacheError
                )
            }
        }
    }

    private func downloadText(from url: URL) async throws -> String {
        var request = URLRequest(url: url)
        request.cachePolicy = .reloadRevalidatingCacheData
        request.timeoutInterval = 15

        let (data, response) = try await session.data(for: request)
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            let statusCode = (response as? HTTPURLResponse)?.statusCode ?? -1
            throw CacheError.invalidResponse(url, statusCode)
        }
        guard let text = String(data: data, encoding: .utf8) else {
            throw CacheError.invalidText(url)
        }
        return text
    }

    private func save(_ text: String, as cacheFileName: String) throws {
        try fileManager.createDirectory(
            at: cacheDirectory,
            withIntermediateDirectories: true
        )
        try Data(text.utf8).write(
            to: cacheDirectory.appendingPathComponent(cacheFileName),
            options: .atomic
        )
    }

    private func read(cacheFileName: String, sourceURL: URL) throws -> String {
        let data = try Data(contentsOf: cacheDirectory.appendingPathComponent(cacheFileName))
        guard let text = String(data: data, encoding: .utf8) else {
            throw CacheError.invalidText(sourceURL)
        }
        return text
    }

    private static func defaultCacheDirectory(using fileManager: FileManager) -> URL {
        let baseDirectory = fileManager.urls(
            for: .applicationSupportDirectory,
            in: .userDomainMask
        ).first ?? fileManager.temporaryDirectory
        return baseDirectory.appendingPathComponent("RemoteAssets", isDirectory: true)
    }
}
