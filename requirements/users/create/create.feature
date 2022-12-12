Feature: Create user
Como um anônimo
Quero poder cadastrar um usuário

Scenario: Dados válidos
    Given: Dado que o anônimo inseriu dados de cadastro válidos
    When: Quando o anônimo solicitar o cadastro de usuário
    Then: Então o sistema deve retornar um sinal indicando que o cadastro foi feito com sucesso
Scenario: Dados inválidos
    Given: Dado que o anônimo inseriu dados de cadastros inválidos
    When: Quando o anônimo solicitar pra efetuar o cadastro de usuário
    Then: Então o sistema deve retornar uma mensagem de erro