use axum::Router;
use crate::controller::create_user::create_users;
use crate::controller::root::root;


//мапим эндпоинты
pub(crate) async fn route() -> Router {
    let app = Router::new()
        .merge(root().await)
        .merge(create_users().await);
        //.route("/create_users", post(create_users));
    app
}