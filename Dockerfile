FROM --platform=linux/amd64 node:current-slim

# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .

ARG AUTH0_AUDIENCE
ARG AUTH0_BASE_URL
ARG AUTH0_CLIENT_ID
ARG AUTH0_CLIENT_SECRET
ARG AUTH0_ISSUER_BASE_URL
ARG AUTH0_SCOPE
ARG AUTH0_SECRET
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_AUTH0_AUDIENCE
ARG NEXT_PUBLIC_AUTH0_BASE_URL
ARG NEXT_PUBLIC_AUTH0_SCOPE

ENV AUTH0_AUDIENCE=${AUTH0_AUDIENCE}
ENV AUTH0_BASE_URL=${AUTH0_BASE_URL}
ENV AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID}
ENV AUTH0_CLIENT_SECRET=${AUTH0_CLIENT_SECRET}
ENV AUTH0_ISSUER_BASE_URL=${AUTH0_ISSUER_BASE_URL}
ENV AUTH0_SCOPE=${AUTH0_SCOPE}
ENV AUTH0_SECRET=${AUTH0_SECRET}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV NEXT_PUBLIC_AUTH0_AUDIENCE=${NEXT_PUBLIC_AUTH0_AUDIENCE}
ENV NEXT_PUBLIC_AUTH0_BASE_URL=${NEXT_PUBLIC_AUTH0_BASE_URL}
ENV NEXT_PUBLIC_AUTH0_SCOPE=${NEXT_PUBLIC_AUTH0_SCOPE}

EXPOSE 3000

CMD [ "npm", "start" ]