use lambda::handler_fn;
use ::lib::handler;
use ::lib::LambdaError;

#[tokio::main]
async fn main() -> Result<(), LambdaError> {
    let runtime_handler = handler_fn(handler);
    lambda::run(runtime_handler).await?;
    Ok(())
}