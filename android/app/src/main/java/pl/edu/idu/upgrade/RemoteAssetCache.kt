package pl.edu.idu.upgrade

import android.content.res.AssetManager
import android.util.AtomicFile
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File
import java.net.HttpURLConnection
import java.net.URL
import java.nio.ByteBuffer
import java.nio.charset.CodingErrorAction

/** Same network-first, last-successful-disk-copy policy as the iOS loader. */
class RemoteAssetCache(
    private val directory: File,
    private val bundledAssets: AssetManager,
) {
    data class Asset(val text: String, val source: String)

    suspend fun loadText(url: String, cacheFileName: String): Asset = withContext(Dispatchers.IO) {
        val cache = AtomicFile(File(directory, cacheFileName))
        try {
            val connection = URL(url).openConnection() as HttpURLConnection
            val bytes = try {
                connection.connectTimeout = 15_000
                connection.readTimeout = 15_000
                connection.useCaches = false
                check(connection.responseCode in 200..299) {
                    "Asset request for $url returned HTTP ${connection.responseCode}"
                }
                connection.inputStream.use { it.readBytes() }
            } finally {
                connection.disconnect()
            }
            val text = decode(bytes)
            // Both asset downloads can reach this at once on the first launch.
            check(directory.mkdirs() || directory.isDirectory) { "Cannot create asset cache" }
            val output = cache.startWrite()
            try {
                output.write(bytes)
                cache.finishWrite(output)
            } catch (error: Exception) {
                cache.failWrite(output)
                throw error
            }
            Asset(text, "network")
        } catch (downloadError: Exception) {
            try {
                Asset(decode(cache.readFully()), "diskCache")
            } catch (cacheError: Exception) {
                try {
                    // Make the first launch useful when the asset host is down or
                    // blocked. Gradle packages the current dist files in the APK.
                    Asset(
                        bundledAssets.open(cacheFileName).use { decode(it.readBytes()) },
                        "bundled",
                    )
                } catch (bundledError: Exception) {
                    throw IllegalStateException("Asset unavailable: $url", downloadError).apply {
                        addSuppressed(cacheError)
                        addSuppressed(bundledError)
                    }
                }
            }
        }
    }

    private fun decode(bytes: ByteArray): String = Charsets.UTF_8.newDecoder()
        .onMalformedInput(CodingErrorAction.REPORT)
        .onUnmappableCharacter(CodingErrorAction.REPORT)
        .decode(ByteBuffer.wrap(bytes)).toString()
}
