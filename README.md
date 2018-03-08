# mywebsocketserver

# Building your image
Go to the directory that has your Dockerfile and run the following command to build the Docker image. The -t flag lets you tag your image so it's easier to find later using the docker images command:
```
docker build -t wsserver .
```

# Run the image
Running your image with -d runs the container in detached mode, leaving the container running in the background. The -p flag redirects a public port to a private port inside the container. Run the image you previously built:
```
docker run --name mywsserver --env mysqlhost=127.0.0.1 --env password=xxxx -p 3000:3000 -d wsserver
```