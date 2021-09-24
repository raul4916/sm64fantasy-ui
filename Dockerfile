#FROM ubuntu
#RUN apt-get install -y nginx
#WORKDIR /root/
#COPY nginx/conf.d/default.conf /etc/nginx/conf.d
#CMD service nginx start

FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "start"]

