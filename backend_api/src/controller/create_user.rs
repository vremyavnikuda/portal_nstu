use axum::http::StatusCode;
use axum::{Json, Router};
use axum::routing::post;
use crate::controller::setup_route::route;
use crate::models;
use crate::models::data::User;

// pub(crate) async fn create_user(Json(payload): Json<models::data::CreateUser>) -> (StatusCode, Json<User>) {
//     let user = User {
//         id: 1337,
//         username: payload.username,
//     };
//     (StatusCode::CREATED, Json(user))
// }

pub(crate) async  fn create_users() -> Router {
    async fn handler(Json(payload): Json<models::data::CreateUser>) -> (StatusCode, Json<User>) {
        let user = User {
            id: 1338,
            username: payload.username,
            email: "andrew.nevsky@yandex.ru".to_string()
        };
        (StatusCode::CREATED, Json(user))
    }
    Router::new().route("/create_users",post(handler))
}