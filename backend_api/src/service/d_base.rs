use std::sync::Arc;
use tokio_postgres::{Client, NoTls};
use dotenv::dotenv;
use std::env::var;
use tokio::task;
use anyhow::{Result, anyhow};

pub(crate) async fn connect_data_base(flag_connect_database: bool) -> Result<Arc<Client>> {
    dotenv().ok();

    if flag_connect_database {
        let database_url = var("DATABASE_URL").expect("DATABASE_URL must be set");

        let (client, connection) = tokio_postgres::connect(&database_url, NoTls).await?;

        task::spawn(async move {
            if let Err(e) = connection.await {
                eprintln!("connection error: {}", e);
            }
        });

        Ok(Arc::new(client))
    } else {
        Err(anyhow!("Соединение с базой данных отключено"))
    }
}