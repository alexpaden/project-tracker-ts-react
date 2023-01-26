Inside server:
Edit .env variables with your postgres DB credentials (I chose to use supabase)
yarn install
yarn build
yarn run typeorm migration:run -d .dist/data-source.js
yarn start

Inside client:
Open client/src/http-common.ts and edit the api url to match your own
Uncomment the signup form within the SignupPage.tsx file
yarn install
yarn test
yarn start
