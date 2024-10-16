use axum::http::StatusCode;
use axum::Json;
use crate::models;
use crate::models::data::User;

pub(crate) async fn create_user(Json(payload): Json<models::data::CreateUser>) -> (StatusCode, Json<User>){
    let user = User {
        id: 1337,
        username: payload.username,
    };(StatusCode::CREATED, Json(user))
}
