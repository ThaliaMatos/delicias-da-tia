import React from 'react';

export default function Contato() {
    return (
        <div className="bg-gradient-body py-5">

            {/* Formulário de Contato */}
            <main className="container my-5">
                <h2 className="text-center mb-5 fw-bold text-pink">Entre em Contato</h2>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <form className="bg-white p-5 rounded-4 shadow-lg">
                            <div className="mb-4">
                                <label htmlFor="nome" className="form-label fw-semibold">Nome</label>
                                <input type="text" className="form-control" id="nome" name="nome" placeholder="Digite seu nome" required />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="form-label fw-semibold">E-mail</label>
                                <input type="email" className="form-control" id="email" name="email" placeholder="Digite seu e-mail" required />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="telefone" className="form-label fw-semibold">Telefone</label>
                                <input type="tel" className="form-control" id="telefone" name="telefone" placeholder="(XX) XXXXX-XXXX" />
                            </div>

                            {/* Se quiser reativar o campo de pedido, descomente abaixo */}
                            {/* 
                            <div className="mb-4">
                                <label htmlFor="pedido" className="form-label fw-semibold">Tipo de Pedido</label>
                                <select className="form-select" id="pedido" name="pedido">
                                    <option>Amanteigados</option>
                                    <option>Bolos</option>
                                    <option>Bolos Low Carb</option>
                                    <option>Doces Especiais</option>
                                    <option>Salgados</option>
                                    <option>Outros</option>
                                </select>
                            </div>
                            */}

                            <div className="mb-4">
                                <label htmlFor="mensagem" className="form-label fw-semibold">Mensagem</label>
                                <textarea className="form-control" id="mensagem" name="mensagem" rows="5" placeholder="Escreva sua mensagem aqui..."></textarea>
                            </div>

                            <button type="submit" className="btn btn-pink w-100 py-2 fw-bold">Enviar Mensagem</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
