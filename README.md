# Next.js OpenJira App

To run Locally, we need the database.

```
docker-compose up -d
```

- The -d, means **detached**

## Set environment variables

Rename the file **.env.template** to **.env**

- MongoDB URL Local:

```
MONGO_URL=mongodb://localhost:27017/entriesdb
```

- Rebuild node modules and run Next

```
yarn install
yarn dev
```

## Fill the database with mock data

Call:

```
http://localhost:3000/api/seed
```
