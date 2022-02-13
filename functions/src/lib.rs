use lambda::Context;
use serde_json::{json, Value};

pub type LambdaError = Box<dyn std::error::Error + Send + Sync + 'static>;

// bootstrap で呼ぶ
pub async fn handler(event: Value, _: Context) -> Result<Value, LambdaError> {
    let name = event["name"].as_str().unwrap_or("world");
    Ok(json!({ "res": format!("{}!", name) }))
}