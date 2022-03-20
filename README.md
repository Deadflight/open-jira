# Next.Js OpenJira

To run it you need the database

```
  docker-compose up -d
```

- -d, means **detached**

Mongodb local URL:

```
  mongodb://localhost:27017/entriesdb
```

## Fill the database with mock data

Call

```
  http://localhost:3000/api/seed
```
