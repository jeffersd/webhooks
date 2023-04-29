use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use std::env;

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // compile time environment variable
    //let host: String = env!("RUST_SERVER_HOST").to_string();

    // runtime environment variable
    let host: String = env::var("RUST_SERVER_HOST").unwrap();

    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(echo)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(host)?
    .run()
    .await
}
