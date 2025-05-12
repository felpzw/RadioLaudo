# RadioLaudo

RadioLaudo is a Tauri-based application designed to process medical images and generate structured medical reports. It leverages a Rust backend for image processing and a React frontend for user interaction.

---

## Features

- **Image Upload**: Drag and drop medical images for processing.
- **AI-Powered Analysis**: Uses an external API to analyze images and generate structured medical reports.
- **Real-Time Feedback**: Displays loading indicators and results in a user-friendly interface.
- **Cross-Platform**: Built with Tauri, making it lightweight and cross-platform.

---

## Project Structure

```
RadioLaudo/
├── src/                # React frontend
│   ├── DropzoneComponent.tsx
│   ├── ImageUploader.tsx
│   ├── LaudoOutput.tsx
│   ├── main.tsx
│   ├── ImageUploader.css
├── src-tauri/          # Tauri backend
│   ├── src/
│   │   ├── lib.rs      # Rust backend logic
│   │   ├── main.rs     # Entry point for the Tauri app
├── README.md           # Project documentation
```

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [Rust](https://www.rust-lang.org/) (latest stable version)
- [Tauri CLI](https://tauri.app/) (install via `cargo install tauri-cli`)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/RadioLaudo.git
    cd RadioLaudo
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:  
    Create a `.env` file in the `src-tauri` directory with the following content:
    ```
    API_HOST=http://localhost:3000
    OLLAMA_API_KEY=your_api_key_here
    ```

4. Run the application:
    ```bash
    npm run tauri dev
    ```

---

## Usage

1. Launch the application.
2. Drag and drop a medical image into the upload area.
3. Wait for the image to be processed.
4. View the generated medical report, including:
    - **Diagnóstico**
    - **Observações**
    - **Recomendações**

---

## Frontend Components

1. **DropzoneComponent.tsx**  
    Handles the drag-and-drop functionality for uploading images.

2. **ImageUploader.tsx**  
    Main component that integrates the dropzone and displays the results.

3. **LaudoOutput.tsx**  
    Displays the structured medical report after processing.

4. **ImageUploader.css**  
    Provides styling for the frontend components.

---

## Backend Logic

1. **lib.rs**  
    - Encodes the uploaded image as Base64.  
    - Parses the API response and returns structured data, including diagnostics, observations, and recommendations.

---

## API Integration

The application integrates with an external API (e.g., Ollama) to process images. The API request is structured as follows:

**Endpoint**: `http://localhost:3000/api/generate`

```json
{
    "model": "llama3.2-vision:90b",
    "prompt": "Analise a imagem fornecida e retorne um JSON estruturado com: 1. 'Diagnosticos', 2. 'Observações', 3. 'Recomendações'.",
    "images": ["<base64_image>"],
    "stream": false,
    "format": {
        "type": "object",
        "properties": {
            "Diagnosticos": { "type": "string" },
            "Observacoes": { "type": "string" },
            "Recomendacoes": { "type": "string" }
        },
        "required": ["Diagnosticos", "Observacoes", "Recomendacoes"]
    }
}
```

---

## Environment Variables

The following environment variables are required for the application to function properly:

- **API_HOST**: The base URL of the external API.
- **OLLAMA_API_KEY**: The API key for authentication with the external service.

---

## Development

### Run in Development Mode

```bash
npm run tauri dev
```

### Build for Production

```bash
npm run tauri build
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Acknowledgments

- **Tauri** for the lightweight framework.
- **React** for the frontend.
- **Ollama API** for image analysis.