const TopText = () => {
  return (
    <div className="container py-16 lg:py-24">
      <div className="flex flex-wrap gap-6 lg:flex-nowrap lg:gap-11">
        <div className="basis-full lg:basis-8/12">
          <h2 className="mb-2 text-[25px] font-bold text-background sm:text-[40px]">
            Nossa História
          </h2>
          <p className="mb-5 text-base text-background">
            Ao longo dessa trajetória, acumulamos experiência em diversas frentes, 
            desde parcerias com instituições como o Sindicato da Polícia Civil do 
            Estado do Pará, associações sem fins lucrativos, prefeituras municipais 
            e empresas privadas, além da atuação em causas individuais. 
          </p>
          <p className="mb-5 text-base text-background">
             Sempre com um olhar voltado para os direitos humanos, justiça social e 
             sustentabilidade amazônica, garantimos direitos e promovemos a defesa 
             de quem mais precisa.
          </p>
        
        </div>
        <div className="basis-full lg:basis-1/3">
          <div className="bg-background p-8">
            <h3 className="mb-2 text-[32px] text-white">Missão</h3>
            <p className="mb-4 text-base text-white">
               Levar justiça e direitos ao meus clientes e aos necessitados.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopText;
