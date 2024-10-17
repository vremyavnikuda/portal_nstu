use axum::Router;
use axum::routing::get;

pub(crate) async fn root() -> Router {
    async fn handler() -> &'static str {
        "Portal NSTU"
    }
    Router::new().route("/", get(handler))
}