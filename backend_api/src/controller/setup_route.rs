use axum::Router;
use axum::routing::{post};
use crate::controller::create_user::create_user;
use crate::controller::root::root;


//мапим эндпоинты
pub(crate) async fn route() -> Router {
    let app = Router::new()
        .merge(root().await)
        .route("/users", post(create_user));
    app
}