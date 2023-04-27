FROM node:18.10
RUN apt-get update && apt-get install -y iputils-ping telnet vim git wget
WORKDIR /app
#COPY package.json /app
#
RUN npm install -g npm pm2 @angular/cli
COPY . /app
RUN npm install
#EXPOSE 4200
#CMD ["ng","serve","--host", "0.0.0.0","--disable-host-check"]
