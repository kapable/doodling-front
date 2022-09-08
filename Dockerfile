FROM node:16.14.0-alpine
WORKDIR /usr/src/next
COPY *.* /usr/src/next
RUN npm install
COPY ./ ./
RUN npm run build
EXPOSE 3060
CMD [ "npm" , "run" , "start"]