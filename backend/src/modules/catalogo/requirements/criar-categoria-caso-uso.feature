Feature: Criar nova categoria de produto

  Como administradora da plataforma Delícias da Tia  
  Quero poder criar novas categorias  
  De modo que os produtos possam ser associados a uma categoria para organizar melhor os produtos oferecidos

  Scenario: Criar uma categoria com nome válido  
    Given que a administradora está autenticada  
    When ela informa o nome da nova categoria como "Bolos"  
    And envia o formulário de criação  
    Then a categoria "Bolos" deve ser salva no sistema

  Scenario: Criar uma categoria sem nome  
    Given que a administradora está autenticada  
    When ela tenta criar uma categoria sem informar o nome  
    Then o sistema deve exibir uma mensagem de erro informando que o nome é obrigatório

  Scenario: Criar uma categoria com nome já existente  
    Given que já existe uma categoria chamada "Doces"  
    And a administradora está autenticada  
    When ela tenta criar outra categoria com o nome "Doces"  
    Then o sistema deve exibir uma mensagem de erro informando que o nome já está em uso
