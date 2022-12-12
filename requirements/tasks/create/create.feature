Feature: Create task
Como um usuário
Quero poder cadastrar uma tarefa

Scenario: Dados válidos
    Given: Dado que o usuário está logado e inseriu dados de cadastro válidos
    When: Quando o usuário solicitar o cadastro da tarefa
    Then: Então o sistema deve retornar um sinal indicando que o cadastro da tarefa foi feita com sucesso
Scenario: Dados inválidos
    Given: Dado que o usuário está logado e inseriu dados de cadastro inválidos
    When: Quando o usuário solicitar pra efetuar o cadastro da tarefa
    Then: Então o sistema deve retornar uma mensagem de erro
Scenario: Usuário não está logado
    Given: Dado que o usuário não está logado
    When: Quando o usuário solicitar pra efetuar o cadastro da tarefa
    Then: Então o sistema deve retornar uma mensagem de erro