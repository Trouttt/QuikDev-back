Feature: Find all tasks
Como um usuário
Quero poder buscar todas as tarefas referente ao usuário

Scenario: Dados válidos
    Given: Dado que o usuário está logado
    When: Quando o usuário solicitar todas as tarefas relacionadas a ele
    Then: Então o sistema deve retornar todas as tarefas relacionadas a ele
Scenario: Usuário não está logado
    Given: Dado que o usuário não está logado
    When: Quando o usuário solicitar todas as tarefas relacionadas a ele
    Then: Então o sistema deve retornar um erro