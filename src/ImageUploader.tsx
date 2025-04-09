import { useCallback, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import DropzoneComponent from './DropzoneComponent';
import LaudoOutput from './LaudoOutput';
import './ImageUploader.css';

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
        const parsedLaudo = JSON.parse(response.response.replace(/\\n/g, '').replace(/\\"/g, '"'));
        setLaudo({
          diagnostico: parsedLaudo.Diagnosticos,
          observacoes: parsedLaudo.Observacoes,
          recomendacoes: parsedLaudo.Recomendacoes,
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

  return (
    <div className="image-uploader-container">
      <h1 className="title">Upload de Imagem Médica</h1>
      <DropzoneComponent onDrop={onDrop} loading={loading} />
      <LaudoOutput laudo={laudo} loading={loading} />
    </div>
  );
}

export default ImageUploader;