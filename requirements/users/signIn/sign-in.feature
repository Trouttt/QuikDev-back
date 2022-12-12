Feature: Sign In
Como um usuário
Quero poder me autenticar

Scenario: Dados válidos
    Given: Dado que o usuário inseriu dados de autenticação válidos
    When: Quando o usuário solicitar a autenticação
    Then: Então o sistema deve retornar um sinal indicando que a autenticação foi feita com sucesso
Scenario: Dados inválidos
    Given: Dado que o usuário inseriu dados de autenticação inválidos
    When: Quando o usuário solicitar pra efetuar a autenticação
    Then: Então o sistema deve retornar uma mensagem de erro