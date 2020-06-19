# Snacks Stand API

API GraphQL para consumo pela plataforma [Snacks Stand](https://github.com/geovanef46/snacks-stand).
Está sendo desenvolvida utilizando a metodologia GraphQL para dispor os dados.

## Executando o projeto

Para rodar o projeto localmente execute os passos a seguir:

```shell
# Clonar o projeto e instalar as dependências
$ git clone https://github.com/juakacc/snacks-stand-api.git
$ cd snacks-stand-api
$ npm i
```

Alterar o arquivo `.envExample` para `.env` e modificar com configurações utilizadas localmente.

Para executar as migrações é necessário ter um banco de dados com o mesmo nome que foi definido em `DB_DATABASE`. _Então é preciso criá-lo manualmente._

```shell
# Executar as migrations
$ npx sequelize-cli db:migrate
```

Executando o projeto

```shell
$ npm start
```

_Ao final espera-se que o servidor esteja em execução no endereço: http://localhost:4000_

## Tecnologias sendo utilizadas

- GraphQL;
- Apollo Server;
- Sequelize;
- Mysql;
