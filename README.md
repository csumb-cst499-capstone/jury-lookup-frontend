#Jury Look up frontend
## Description
This is frontend application developed for Superior Court of Monterey by CSUMB students. 
## Tech
- Next.JS
- NextUI (UI Framework)
- Next-Auth + Auth0
  
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
3. In the root directory of this project create a new file called `.env.local` this will store our environment variables.
4. Paste the following variables into your `.env.local` file
```
NEXTAUTH_SECRET=[GENERATE ME]
NEXTAUTH_URL=[APP URL] // for dev this is http://localhost:3001
AUTH0_ISSUER=[REPLACE ME]
AUTH0_CLIENT_ID=[REPLACE ME]
AUTH0_CLIENT_SECRET=[REPLACE ME]
```
5. Run the following command in your terminal to generate a secret and replace `[GENERATE ME]` with it 
```
openssl rand -base64 32
```
6. Sign up for an <a href="auth0.com">Auth0 account</a>
7. Create a regular web application and select Next.js.
8. Replace the following environment variables provided by Auth0
```
AUTH0_ISSUER=[REPLACE ME]
AUTH0_CLIENT_ID=[REPLACE ME]
AUTH0_CLIENT_SECRET=[REPLACE ME]
```
