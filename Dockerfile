FROM node:16.14.0-alpine
WORKDIR /usr/src/next
RUN npm install pm2 -g
COPY *.* /usr/src/next
RUN npm install --production
COPY ./ ./
RUN npm run build
EXPOSE 3060
CMD [ "sh", "-c", "pm2-runtime start npm -- start"]
# CMD [ "npm", "run", "start" ]