Feature: Cadastro de produtos com categorias fixas

  Como administradora do Delícias da Tia  
  Quero cadastrar produtos associando-os a categorias fixas já definidas no sistema  
  Para organizar os produtos de forma clara para os clientes

  Background:  
    Dado que as categorias fixas "Bolos", "Doces" e "Salgados" já estão cadastradas no sistema

  Scenario: Cadastrar um produto com categoria válida  
    Given que a administradora está autenticada  
    When ela preenche os dados do produto com a categoria "Bolos"  
    And envia o formulário de cadastro  
    Then o produto deve ser salvo no sistema com a categoria "Bolos"

  Scenario: Cadastrar um produto sem selecionar categoria  
    Given que a administradora está autenticada  
    When ela tenta cadastrar um produto sem selecionar uma categoria  
    Then o sistema deve exibir uma mensagem de erro informando que a categoria é obrigatória

  Scenario: Cadastrar um produto com categoria inválida  
    Given que a administradora está autenticada  
    When ela tenta cadastrar um produto com uma categoria que não existe no sistema  
    Then o sistema deve exibir uma mensagem de erro informando que a categoria não é válida
