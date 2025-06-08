import { useEffect } from 'react';

export default function BlogReceitas() {
  useEffect(() => {
    document.title = "Blog de Receitas | Delícias da Tia";
  }, []);

  const receitas = [
    {
      id: 1,
      titulo: "Bolo de Cenoura com Cobertura de Chocolate",
      descricao: "Um clássico que agrada a todos! Fofinho, úmido e com uma deliciosa calda de chocolate.",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6pd_g70-pQZvk3Qn2orq_r1Ed1PGRlgFs3YKVUxIkyKY6XB8yaL5ELvn4p3-ELv_9bGk&usqp=CAU"
    },
    {
      id: 2,
      titulo: "Coxinha de Frango com Catupiry",
      descricao: "Recheio cremoso e massa sequinha. Uma das campeãs de venda da Tia!",
      imagem: "https://i.ytimg.com/vi/ZiI1HK6zOkk/maxresdefault.jpg"
    },
    {
      id: 3,
      titulo: "Brigadeiro Gourmet",
      descricao: "Feito com chocolate nobre, perfeito para festas ou presentear alguém especial.",
      imagem: "https://harald.com.br/wp-content/uploads/2020/04/briadeirogormet-melken-700x520-1.jpg"
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Blog de Receitas</h2>

      <div className="row">
        {receitas.map((receita) => (
          <div key={receita.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={receita.imagem}
                className="card-img-top"
                alt={receita.titulo}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{receita.titulo}</h5>
                <p className="card-text">{receita.descricao}</p>
                <button className="btn btn-outline-pink mt-auto" disabled>
                  Ver receita
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
