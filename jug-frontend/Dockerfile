FROM node:24-alpine AS builder

ARG NODE_AUTH_TOKEN
ENV NODE_AUTH_TOKEN=${NODE_AUTH_TOKEN}

WORKDIR /app

COPY package*.json .npmrc* ./
RUN cat .npmrc && echo "NODE_AUTH_TOKEN is: ${NODE_AUTH_TOKEN:0:10}..." && npm install --ignore-scripts

COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs24-debian13:nonroot

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 5173

CMD ["dist/index.html"]
