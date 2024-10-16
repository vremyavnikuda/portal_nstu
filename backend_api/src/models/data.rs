use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
//Model::CreateUser
pub(crate) struct CreateUser {
    pub(crate) username: String,
}

#[derive(Serialize)]
//Model::User
pub(crate) struct User {
    pub(crate) id: u64,
    pub(crate) username: String,
}