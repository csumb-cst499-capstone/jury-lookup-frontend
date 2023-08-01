#Jury Look up frontend
## Description
This is frontend application developed for Superior Court of Monterey by CSUMB students. 
## Tech
- Next.JS
- NextUI (UI Framework)
- Auth0
  
### To get started:
1. Clone this repo
```
git clone https://github.com/csumb-cst499-capstone/jury-lookup-frontend.git

or

git clone git@github.com:csumb-cst499-capstone/jury-lookup-frontend.git

```
2. Install dependencies
```
npm install
```
3. In the root directory of this project create a new file called `.env.local` this will store our environment variables. *Your urls for frontend and backend may differ based on ports specified or if there are conflicts.*
4. Paste the following variables into your `.env.local` file
```
AUTH0_CLIENT_ID=[REPLACE ME]
AUTH0_CLIENT_SECRET=[REPLACE ME]
AUTH0_ISSUER_BASE_URL=[REPLACE ME]
AUTH0_SCOPE=openid profile email read:jurors write:jurors
AUTH0_SECRET=[GENERATE ME]
AUTH0_AUDIENCE=[BACKEND URL or http://localhost:8080]
AUTH0_BASE_URL=[FRONTEND URL or http://localhost:3000]

NEXT_PUBLIC_API_URL=[BACKEND URL or http://localhost:8080] 
NEXT_PUBLIC_BASE_URL=[FRONTEND URL or http://localhost:3000]
NEXT_PUBLIC_AUTH0_AUDIENCE=[BACKEND URL or http://localhost:8080]
NEXT_PUBLIC_AUTH0_BASE_URL=[FRONTEND URL or http://localhost:3000]
NEXT_PUBLIC_AUTH0_SCOPE=openid profile email read:jurors write:jurors

```
5. Run the following command in your terminal to generate a secret and replace `[GENERATE ME]` with it 
```
openssl rand -base64 32
```
6. Sign up for an <a href="auth0.com">Auth0 account</a>
7. Create a regular web application and select Next.js.
8. Replace the following environment variables provided by Auth0
```
AUTH0_ISSUER_BASE_URL=[REPLACE ME]
AUTH0_CLIENT_ID=[REPLACE ME]
AUTH0_CLIENT_SECRET=[REPLACE ME]
```
