Feature: Find one task
Como um usuário
Quero poder buscar todas as tarefas referente ao usuário

Scenario: Dados válidos
    Given: Dado que o usuário está logado
    When: Quando o usuário solicitar uma tarefa relacionada a ele
    Then: Então o sistema deve retornar uma tarefa relacionada a ele
Scenario: Usuário não está logado
    Given: Dado que o usuário não está logado
    When: Quando o usuário solicitar uma tarefa relacionada a ele
    Then: Então o sistema deve retornar um erro