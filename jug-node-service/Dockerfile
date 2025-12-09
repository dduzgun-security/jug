FROM node:24-alpine AS builder

ARG NODE_AUTH_TOKEN
ENV NODE_AUTH_TOKEN=${NODE_AUTH_TOKEN}

WORKDIR /app

COPY package*.json .npmrc* ./
RUN npm install --production --ignore-scripts

COPY . .

FROM gcr.io/distroless/nodejs24-debian13:nonroot

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000

CMD ["src/index.js"]
