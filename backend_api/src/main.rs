mod models;
mod service;
mod controller;

use axum::{
    http::StatusCode,
    Json,
};
use crate::controller::setup_route::route;
use crate::models::data::User;
use crate::service::port::port;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt().with_target(false).compact().init();
    let _app = route().await;
    let _addr = port().await;

    axum::serve(_addr, _app).await.unwrap();
}

async fn create_user(
    Json(payload): Json<models::data::CreateUser>,
) -> (StatusCode, Json<User>) {
    let user = User {
        id: 1337,
        username: payload.username,
    };

    (StatusCode::CREATED, Json(user))
}
