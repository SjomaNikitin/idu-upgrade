package pl.edu.idu.upgrade

object AppConfig {
    const val BASE_URL = "https://idu.edu.pl"
    const val CONTENT_SCRIPT_URL = "https://idu-upgrade-assets.szymon-nikitin.workers.dev/content.js"
    const val STYLESHEET_URL = "https://idu-upgrade-assets.szymon-nikitin.workers.dev/styles.css"
    // IDU redirects the shared entry point to a tenant subdomain such as
    // s35.idu.edu.pl. Both rules are required because the wildcard does not
    // match the apex host itself.
    val allowedOrigins = setOf(
        BASE_URL,
        "https://*.idu.edu.pl",
    )
}
