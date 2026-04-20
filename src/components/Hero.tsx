type Props = {
  openModal: () => void;
};

export function Hero({ openModal }: Props) {
  return (
    <section className="hero-card">
      <div className="hero-content">
        <span className="hero-badge">QR Studio</span>

        <h1>Gere QR Codes bonitos e rápidos</h1>

        <p>
          Crie QR Codes personalizados direto no navegador.
        </p>

        <button
          className="btn btn-primary"
          onClick={openModal}
        >
          Criar QR Code
        </button>
      </div>
    </section>
  );
}