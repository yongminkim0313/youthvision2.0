FROM node:12.22.12
WORKDIR /app

COPY package.json .

ADD . .
RUN npm install
CMD ["node", "index"]