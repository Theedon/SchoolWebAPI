# School Web API

## Description

A simple school web API for managing the data of teachers, students and classrooms.

## Technologies Used

- **Typescript** : Programming Language
- **Node.JS** : Runtime Environment
- **Express** : Web Application Framework
- **Prisma** : Object Relational Mapper (ORM)
- **SQLite** : Database

## Features

- Create and retrieve Teacher(s) information -> `/teachers` | `/teachers/:id`
- Create and retrieve Student(s) information ->`/students` | `/students/:id`
- Create and retrieve Classroom(s) information ->`classrooms` | `/classrooms/:id`
- Retrieve all Students under a teacher ->`/teachers/:id/students`
- Retrieve the name of the teacher assigned to a student ->`students/:id/teacher`

## Prerequisites

- Node.JS LTS
- npm

## Installation

1. Clone the repository.
2. Navigate to the project directory: `cd ./SchoolWebAPI`
3. Install dependencies: `npm install`

## Usage

## Local environment Usage

1. Build the project: `npm run build`
2. Start the server `npm run start`
3. Access and test endpoints in [Postman](https://www.postman.com/orbital-module-pilot-52128238/workspace/theedon-public/collection/29235308-8cadc63f-3073-4738-8ead-1d1f36e9b316?action=share&creator=29235308)

### Docker Container

- Build the app image using the provided Dockerfile `docker build -t schoolwebapi .`
- Run a container from the image `docker run -p 3000:3000 --name schoolapi schoolwebapi`

## Examples and Documentation

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/29235308-8cadc63f-3073-4738-8ead-1d1f36e9b316?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D29235308-8cadc63f-3073-4738-8ead-1d1f36e9b316%26entityType%3Dcollection%26workspaceId%3D47c11685-bcc1-46b4-bbe3-9b1340079800)

## Additional Notes

- **CORS**: The API is configured with CORS (Cross-Origin Resource Sharing) to allow requests from **all** origins **only for testing purposes**.

---

- **Linting**: Eslint is used to enforce code style and quality guidelines.

---

- **Formatting**: This project uses Prettier for consistent code formatting.

## Workflows

[![Code Build](https://github.com/Theedon/SchoolWebAPI/actions/workflows/build.yml/badge.svg)](https://github.com/Theedon/SchoolWebAPI/actions/workflows/build.yml)

[![Linting](https://github.com/Theedon/SchoolWebAPI/actions/workflows/linter.yml/badge.svg)](https://github.com/Theedon/SchoolWebAPI/actions/workflows/linter.yml)

[![Cloud run Deployment](https://github.com/Theedon/SchoolWebAPI/actions/workflows/cloudrun-deploy.yml/badge.svg)](https://github.com/Theedon/SchoolWebAPI/actions/workflows/cloudrun-deploy.yml)
