function LaudoOutput({ laudo, loading }) {
    return (
      <div className="laudo-container">
        {loading && !laudo && (
          <p className="loading-text">Processando imagem...</p>
        )}
        {laudo && (
          <div className="laudo-content">
            <h2>Laudo Médico</h2>
            <div className="laudo-item">
              <strong>Diagnóstico:</strong> <span>{laudo.diagnostico}</span>
            </div>
            <div className="laudo-item">
              <strong>Observações:</strong> <span>{laudo.observacoes}</span>
            </div>
            <div className="laudo-item">
              <strong>Recomendações:</strong> <span>{laudo.recomendacoes}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default LaudoOutput;