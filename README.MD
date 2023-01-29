# Project Manager

This project is an extendable project manager which currently services bug tracking with notes. It allows projects to be viewed openly, while new submissions require an account. This behavior can be scoped and extended if desired.

##

![React](https://github.com/aleen42/badges/raw/master/src/react.svg)

![TypeScript](https://github.com/aleen42/badges/raw/master/src/typescript.svg)

![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

## Demo

#### Live Demo App:

https://alexpadenprojmanager.netlify.app/

#### Projects API:

https://project-manager-375822.uc.r.appspot.com/projects

## Features

- Light/dark mode toggle
- Login and Signup
- Auth to post, unauth get
- View admin panel as display only
- create project, bug, note
- loading data spinner
- filter by multiple options
- search for partial name
- yarn up-all, auto updates

## Deployment

To prepare this project for deployment

```
1) from server copy .env.example to .env

2) modify the .env variables to your own
```

```
1) from client open src/http-common.ts

2) uncomment the localhost:8080 API url

3) uncomment the signup form in the Auth/Signup.tsx page
```

Deploy client

```bash
  yarn install
  yarn start
```

Deploy server

```bash
  yarn install
  yarn build
  yarn run typeorm migration:run -d dist/data-source.js
  yarn start
```

## Sample Views

![dashboard](https://i.imgur.com/LhP8Cwe.png)

![project table](https://i.imgur.com/wRpsFVJ.png)

![mobile notes view](https://i.imgur.com/r6N6opx.png)

## License

This Project is open-source under MIT license!

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

- This project is an updated and modified from the ground up version of the MIT open @amand33p bug tracker!
