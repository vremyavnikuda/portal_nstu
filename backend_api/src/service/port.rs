use tokio::net::TcpListener;

pub async fn port() -> TcpListener {
    let port = TcpListener::bind("0.0.0.0:3000").await.unwrap();
    println!("Listening on {:?}", port);
    port
}