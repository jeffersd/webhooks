use std::env;

fn main() {
    let host: String = env::var("RUST_SERVER_HOST").unwrap();
    println!("cargo:rustc-env=BUILD_HOST={:?}", host);
}
