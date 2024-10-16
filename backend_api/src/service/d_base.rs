use std::sync::Arc;
use dotenv::{dotenv, var};
use tokio_postgres::{Client, NoTls, Error};

pub(crate) async fn connect_data_base() -> Result<Arc<Client>, Error> {
    dotenv().ok();
    let database_url = var("DATABASE_URL").expect("DATABASE_URL must be set");

    let (client, connection) = tokio_postgres::connect(&database_url, NoTls).await?;

    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("connection error: {}", e);
        }
    });

    Ok(Arc::new(client))
}