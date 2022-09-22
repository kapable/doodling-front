FROM node:16-alpine
WORKDIR /usr/src/next
RUN npm install pm2 -g
# COPY *.* /usr/src/next
COPY package*.json ./
RUN npm install --production
ENV NODE_ENV production
COPY ./ ./
RUN npm run build
EXPOSE 3060
CMD [ "sh", "-c", "pm2-runtime start npm -- start"]