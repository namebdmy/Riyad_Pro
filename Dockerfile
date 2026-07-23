FROM node:20x
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "node" ,"index.js" ]
