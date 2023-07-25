FROM --platform=linux/amd64 node:current-slim
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .

# Set the default values for ARGs (if needed)
ARG AUTH0_CLIENT_ID
ARG AUTH0_CLIENT_SECRET
ARG AUTH0_SECRET
ARG AUTH0_BASE_URL
ARG AUTH0_ISSUER_BASE_URL
ARG AUTH0_SCOPE='openid profile email read:jurors write:jurors'
ARG AUTH0_AUDIENCE
ARG API_URL
ARG BASE_URL

# Add environment variables with correct values
ENV AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID}
ENV AUTH0_CLIENT_SECRET=${AUTH0_CLIENT_SECRET}
ENV AUTH0_SECRET=${AUTH0_SECRET}
ENV AUTH0_BASE_URL=${AUTH0_BASE_URL}
ENV AUTH0_ISSUER_BASE_URL=${AUTH0_ISSUER_BASE_URL}
ENV AUTH0_SCOPE=${AUTH0_SCOPE}
ENV AUTH0_AUDIENCE=${AUTH0_AUDIENCE}
ENV API_URL=${API_URL}
ENV BASE_URL=${BASE_URL}

EXPOSE 3000

CMD [ "npm", "start" ]
