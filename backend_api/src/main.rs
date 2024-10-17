mod models;
mod service;
mod controller;

use crate::controller::setup_route::route;
use crate::service::d_base::connect_data_base;
use crate::service::port::port;

#[tokio::main]
async fn main() -> Result<(), anyhow::Error> {
    // Инициализация логирования
    tracing_subscriber::fmt().with_target(false).compact().init();

    // Подключение к базе данных
    // flag_connect_database == false -> запрещено подключение к базе данных
    // flag_connect_database == true -> разрешено подключение к базе данных
    match connect_data_base(true).await {
        Ok(client) => {
            println!("Successfully connected to the database");
            Some(client)
        }
        Err(e) => {
            eprintln!("Failed to connect to the database: {}", e);
            // Продолжаем работу сервиса даже если подключение не удалось
            None
        }
    };

    // Создание маршрутов и сервера
    let app = route().await;
    let addr = port().await;

    // Запуск сервера
    axum::serve(addr, app).await?;

    Ok(())
}