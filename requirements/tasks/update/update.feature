Feature: Update task
Como um usuário
Quero poder atualizar uma tarefa

Scenario: Dados válidos
    Given: Dado que o usuário está logado e inseriu dados válidos
    When: Quando o usuário solicitar a atualização da tarefa
    Then: Então o sistema deve atualizar a tarefa com sucesso
Scenario: Dados inválidos
    Given: Dado que o usuário está logado e inseriu dados inválidos
    When: Quando o usuário solicitar a atualização da tarefa
    Then: Então o sistema deve retornar um erro
Scenario: Usuário não está logado
    Given: Dado que o usuário não está logado
    When: Quando o usuário solicitar a atualização da tarefa
    Then: Então o sistema deve retornar um erro