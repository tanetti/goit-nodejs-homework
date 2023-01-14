FROM node:18.13-alpine3.17

WORKDIR /contacts_app

COPY ./package.json .
RUN npm install

COPY . .

EXPOSE 8822

CMD npm start