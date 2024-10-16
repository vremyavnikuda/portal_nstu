use axum::Router;
use axum::routing::{get, post};
use crate::{create_user};
use crate::controller::root::root;

pub(crate) async fn route() -> Router{
    let app = Router::new()
        .route("/", get(root))
        .route("/users", post(create_user));
    app
}
