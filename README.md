# ada-tests-jest

## Requisitos
- Crie testes unitários para o fluxo de sessão de usuários (Controllers e Services)
- Não é necessário fazer testes e2e mas será apreciado
- Utilize mocks quando necessário

## Instalação e Execução
1. Verifique se você possui o [NodeJS](https://nodejs.org/en/download/current) instalado.

2. Certifique-se de ter o [MongoDB](https://www.mongodb.com/pt-br) rodando em sua máquina. 

3. Crie um arquivo **.env** e inclua as variáveis de ambiente necessárias, como informações de conexão com o banco de dados e chaves JWT.

```bash
  PORT=
  MONGO_DB_URL=
  SECRET_KEY=
```

4. Instale as dependências do projeto.
```bash
  npm install
```

5. Inicie a aplicação.
```bash
  node index.js
```

6. Em um novo terminal, execute os testes.
```bash 
  npm test
```
