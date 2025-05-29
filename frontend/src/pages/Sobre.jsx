export default function Sobre() {
    return (
        <div className="bg-gradient-body">

            {/* Conteúdo Sobre Nós */}
            <section className="container my-5">
                <div className="row align-items-center">
                    {/* Imagem */}
                    <div className="col-lg-6 col-md-12 text-center mb-4 mb-lg-0">
                        <img src="/img/ImagemFabricia.jpg" alt="Proprietária da Delícias da Tia" className="img-fluid rounded" />
                    </div>
                    {/* Informações */}
                    <div className="col-lg-6 col-md-12">
                        <h2 className="mb-3 fw-bold">Sobre Nós</h2>
                        <p>
                            Bem-vindo(a) à Delícias da Tia! Aqui, você encontrará doces, bolos e tortas feitos com muito amor e carinho.
                            Nossa fundadora, Fabricia, começou este negócio com o objetivo de trazer mais alegria e sabor às mesas de cada cliente.
                        </p>
                        <p>
                            Com receitas caseiras e ingredientes de alta qualidade, garantimos que cada produto seja único e especial.
                            Venha nos conhecer e saborear nossas delícias!
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
