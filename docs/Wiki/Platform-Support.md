### amd64/x86-64

Mango supports all OS on amd64. You can install Mango using either [`docker-compose`](https://github.com/hkalexling/Mango#docker) or the official docker images on [Dockerhub](https://hub.docker.com/r/hkalexling/mango). If you are using Linux, it is recommended to use the pre-built binary file from the latest [release](https://github.com/hkalexling/Mango/releases/). The binary file contains all the dependencies and static files, so it's the easiest way to get Mango up and running.

### arm32v7/arm64v8

Please follow the instructions below to install Mango on ARM devices.

1. Make sure you have Docker and `docker-compose` installed
2. Clone the repository and `cd` into it
3. Download the object file for your architecture (`mango-*.o`) from the latest [release](https://github.com/hkalexling/Mango/releases/) and place it in the cloned repository
4. Edit the `docker-compose.yml` file and change the `dockerfile` field to either `./Dockerfile.arm32v7` or `./Dockerfile.arm64v8`, depending on your system architecture.
5. Follow the regular [Docker installation guide](https://github.com/hkalexling/Mango#docker) to build and run the container



