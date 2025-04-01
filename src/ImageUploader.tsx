import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { invoke } from '@tauri-apps/api/core';

function ImageUploader() {
  const [laudo, setLaudo] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const arrayBuffer = reader.result;
      const uint8Array = new Uint8Array(arrayBuffer);
      setLoading(true);
      try {
        const response = await invoke('process_image', { image: Array.from(uint8Array) });
        //alert(JSON.stringify(response, null, 2)); // Display the object as a formatted JSON string
        //alert(response.response);
        const parsedLaudo = JSON.parse(response.response.replace(/\\n/g, '').replace(/\\"/g, '"'));
        setLaudo({
          diagnostico: parsedLaudo.Diagnosticos,
          observacoes: parsedLaudo.Observacoes,
          recomendacoes: parsedLaudo.Recomendacoes
        });
      } catch (error) {
        console.error('Erro ao processar imagem:', error);
        alert('Erro ao processar imagem.');
      } finally {
        setLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Upload de Imagem Médica</h1>
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #cccccc',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          transition: 'border-color 0.3s',
          ...(isDragActive && { borderColor: '#2196f3' }),
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Solte a imagem aqui...</p>
        ) : (
          <p>Arraste e solte uma imagem aqui, ou clique para selecionar</p>
        )}
      </div>
      {loading && <p style={{ textAlign: 'center', marginTop: '10px', color: '#666' }}>Processando...</p>}
      {laudo && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#e9f7ef',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ color: '#2e7d32', marginBottom: '10px' }}>Laudo Médico</h2>
          <p><strong>Diagnóstico:</strong> {laudo.diagnostico}</p>
          <p><strong>Observações:</strong> {laudo.observacoes}</p>
          <p><strong>Recomendações:</strong> {laudo.recomendacoes}</p>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;