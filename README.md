# NodeJS Typescript Express

This is an Express API project that provides endpoints for managing employees and departments.

## Summary

- [Getting Started](#getting-started)
- [Running the project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Documentation](#documentation)
- [Middleware](#middleware)
- [Environment variables](#environment-variables)
- [Deployment and swagger](#deployment-and-swagger)
- [Contribuiting](#contributing)

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd <repository-directory>
npm install
```

## Running the Project

To start the server, run the following command:

```bash
npm run dev
```

The server will start on port 3000, or the port specified in your environment variables.

## API Endpoints

The API provides the following endpoints:

Health:

```bash
GET /health: Check the health status of the API.
```

Departments:

```bash
GET /departments: Retrieve a list of departments.
GET /departments/{id}: Retrieve a single department.
POST /departments: Create a new department.
PATCH /departments/{id}: Update an existing department.
DELETE /departments/{id}: Delete a department.
```

Employees:

```bash
GET /employees: Retrieve a list of employees.
GET /employees/{id}: Retrieve a single employee.
POST /employees: Create a new employee.
PATCH /employees/{id}: Update an existing employee.
DELETE /employees/{id}: Delete a employee.
```

## Documentation

API documentation is available at [/docs](./src/docs/schemas.json).

## Middleware

The API uses the following middleware:

**apiKeyMiddleware**: Validates the API key in the request.
**httpLoggerMiddleware**: Logs HTTP requests.
**errorHandlerMiddleware**: Handles errors and sends appropriate responses.

## Environment Variables

The following environment variables are used:

EnvVars.PORT: The port on which the server runs.

## Deployment and swagger

This API is deployed in [Heroku](https://dashboard.heroku.com/apps). You can visit the deployed swagger by clicking [here](https://irene-test-f0ee94d1b297.herokuapp.com/docs/#/)

*Note:* Remember to add your API Key to test the endpoints

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.
