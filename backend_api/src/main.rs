mod models;
mod service;
mod controller;

use axum::Error;
use crate::controller::setup_route::route;
use crate::service::d_base::connect_data_base;
use crate::service::port::port;

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing_subscriber::fmt().with_target(false).compact().init();
    let _client_data_base = connect_data_base().await.expect("Не удалось подключиться к базе \
    данных");
    let _app = route(_client_data_base).await;
    let _addr = port().await;

    axum::serve(_addr, _app).await.unwrap();
    Ok(())
}