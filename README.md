# Snacks Stand API

API GraphQL para consumo pela plataforma `Snacks Stand`.
Está sendo desenvolvida utilizando a metodologia GraphQL para dispor os dados.

## Executando o projeto

Para rodar o projeto localmente execute os passos a seguir:

```shell
# Clonar o projeto e instalar as dependências
$ git clone https://github.com/juakacc/snacks-stand-api.git
$ cd snacks-stand-api
$ npm i
```

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
