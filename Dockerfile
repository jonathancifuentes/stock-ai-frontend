
FROM node:20
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
RUN npm install -g serve
EXPOSE 8080
CMD ["serve", "-s", "build", "-l", "8080"]
