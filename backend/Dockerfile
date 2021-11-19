FROM node:14
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json .
RUN yarn global add ts-node
RUN yarn install --prod
COPY . .
EXPOSE 8080
USER node
CMD ["yarn", "prod"]