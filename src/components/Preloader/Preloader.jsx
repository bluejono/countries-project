import './Preloader.css';

function Preloader() {
  return (
    <div className="preloader" role="status" aria-label="Carregando...">
      <div className="preloader__circle" />
    </div>
  );
}

export default Preloader;
