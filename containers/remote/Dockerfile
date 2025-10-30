FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npx", "webpack", "serve", "--config", "webpack.config.js", "--mode", "development", "--host", "0.0.0.0"]
