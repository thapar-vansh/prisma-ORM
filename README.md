



# Prisma-ORM

The project is created using Typescript , Prisma and NodeJS .



## API Reference

#### Get All Players

```http
  GET /api/player
```
#### Post a Player

```http
  Post /api/player
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. name of player |
| `country` | `string` | **Required**. country |

#### Update a Player

```http
  Put /api/player/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. name of player |
| `country` | `string` | **Required**. country |


#### Get Team Stats

```http
  GET /api/team/stats/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of item to fetch |


## Deployment

To run this project run

```bash
  npm run start
```
## To deploy the database

```bash
  npx prisma migrate deploy
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

`API_PORT` 

## Run Locally

Clone the project

```bash
  git clonehttps://github.com/thapar-vansh/prisma-ORM.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Tech Stack



** Node, Express, Prisma, Typescript **

## Authors

- [@vanshthapar](https://www.github.com/octokatherine)


