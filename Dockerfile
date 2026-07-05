# ---------- Build Stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# ---------- Production Stage ----------
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/lua ./lua

RUN mkdir logs

EXPOSE 3000

CMD ["node", "dist/index.js"]