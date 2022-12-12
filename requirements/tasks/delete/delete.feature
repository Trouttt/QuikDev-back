Feature: Delete task
Como um usuário
Quero poder deletar uma tarefa

Scenario: Dados válidos
    Given: Dado que o usuário está logado e inseriu um id de uma tarefa válida
    When: Quando o usuário solicitar a remoção da tarefa
    Then: Então o sistema deve retornar um sinal indicando que a remoção da tarefa foi feita com sucesso
Scenario: Dados inválidos
    Given: Dado que o usuário está logado e inseriu um id de uma tarefa não existente
    When: Quando o usuário solicitar a remoção da tarefa
    Then: Então o sistema deve retornar uma mensagem de erro
Scenario: Usuário não está logado
    Given: Dado que o usuário não está logado
    When: Quando o usuário solicitar a remoção da tarefa
    Then: Então o sistema deve retornar uma mensagem de erro