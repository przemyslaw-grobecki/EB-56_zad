FROM node:18.15.0-alpine
WORKDIR /app
COPY 5_zad .
ENV PATH app/node_modules/.bin:$PATH
RUN npm install 
EXPOSE 5173
CMD [ "npm", "run", "dev", "--", "--host" ]