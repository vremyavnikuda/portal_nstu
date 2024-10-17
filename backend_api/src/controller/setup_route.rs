use std::sync::Arc;
use axum::Router;
use axum::routing::{get, post};
use tokio_postgres::Client;
use crate::controller::create_user::create_user;
use crate::controller::root::root;

pub(crate) async fn route(_client_data_base: Option<Arc<Client>>) -> Router {
    let app = Router::new()
        .route("/", get(root))
        .route("/users", post(create_user));

    app.with_state(_client_data_base)
}
