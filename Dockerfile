FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

ENV NODE_ENV production
ENV DATABASE_URL mongodb://jon:J0nnyb0y123@bovada-shard-00-00-0bdzw.mongodb.net:27017,bovada-shard-00-01-0bdzw.mongodb.net:27017,bovada-shard-00-02-0bdzw.mongodb.net:27017/admin?ssl=true&replicaSet=Bovada-shard-0&authSource=admin


COPY . /usr/src/app

EXPOSE 5000

CMD ["npm", "start"]
