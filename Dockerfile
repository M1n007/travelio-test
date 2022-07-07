FROM ubuntu:20.04

USER root

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get update && apt-get upgrade -y && apt-get install nodejs -y

# Install Node Modules Based On Node Packages Requirement
RUN npm i 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]