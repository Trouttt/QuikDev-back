Feature: Remove many tasks
Como um usuário
Quero poder deletar todas as tarefas em progresso OU finalizadas

Scenario: Dados válidos
    Given: Dado que o usuário está logado
    When: Quando o usuário solicitar a remoção de todas as tarefas em progresso OU finalizadas
    Then: Então o sistema deve retornar uma mensagem de sucesso
Scenario: Usuário não está logado
    Given: Dado que o usuário não está logado
    When: Quando o usuário solicitar uma tarefa relacionada a ele
    Then: Então o sistema deve retornar um erro