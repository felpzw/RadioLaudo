import { useDropzone } from 'react-dropzone';

function DropzoneComponent({ onDrop, loading }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? 'dropzone-active' : ''}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Solte a imagem aqui...</p>
      ) : (
        <p>Arraste e solte uma imagem aqui, ou clique para selecionar</p>
      )}
      {loading && <div className="spinner"></div>}
    </div>
  );
}

export default DropzoneComponent;