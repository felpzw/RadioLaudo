use serde_json::json;
use base64::{engine::general_purpose, Engine as _};
//use tauri::webview::PageLoadPayload;
use std::env;
use reqwest::Client;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
async fn process_image(image: Vec<u8>) -> tauri::Result<serde_json::Value> {
    // Example: Process the image bytes (e.g., calculate size)
    //let image_size = image.len();
    let base64_image = general_purpose::STANDARD.encode(&image);

    let api_host = env::var("API_HOST").unwrap_or_else(|_| "http://localhost:3000".to_string());
    let api_url = format!("{}/api/generate", api_host);

    let payload = json!({
        "model": "llama3.2-vision:90b",
        "prompt": "Analise a imagem fornecida e retorne um JSON estruturado com: 1. 'Diagnosticos' (descrição técnica), 2. 'Observações' (análise detalhada), 3. 'Recomendações' (orientações práticas). Use português brasileiro.",
        "images": [base64_image],
        "stream": false,
        "format": {
          "type": "object",
          "properties": {
            "Diagnosticos": {
              "type": "string",
              "description": "Identificação técnica de possíveis condições"
            },
            "Observacoes": {
              "type": "string",
              "description": "Análise detalhada das características observadas"
            },
            "Recomendacoes": {
              "type": "string",
              "description": "Orientações práticas baseadas na análise"
            }
          },
          "required": ["Diagnosticos", "Observacoes", "Recomendacoes"]
        }
    });

    // Create a new HTTP client
    let client = Client::new();
    // Send the image to the API
    let response = client.post(&api_url)
        .header("Content-Type", "application/json")
        .json(&payload)
        .send()
        .await.expect("Failed to send request");

    // Return a JSON response

    // Parse the response as JSON
    let json_response = response.json::<serde_json::Value>().await
        .expect("Failed to parse JSON response");
    Ok(json_response.into())

    /*
    json!({
        "status": "success",
        "message": "Image processed successfully",
        "image_size": image_size,
        "base64_image": base64_image
    })
     */
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![process_image])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
