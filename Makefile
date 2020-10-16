NS = techteam
VERSION = latest
IMAGE_NAME = template_project
CONTAINER_NAME = template_project
PORTS = 3001:3000

build: Dockerfile
	docker build -t $(NS)/$(IMAGE_NAME):$(VERSION) -f Dockerfile .

run:
	docker run -v ${PWD}:/app -v /app/node_modules -p $(PORTS) --rm $(NS)/$(IMAGE_NAME):$(VERSION)

stop:
	docker stop $(CONTAINER_NAME)

delete:
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME)

start: Dockerfile
	docker build -t $(NS)/$(IMAGE_NAME):$(VERSION) -f Dockerfile .
	docker run -v ${PWD}:/app -v /app/node_modules -p $(PORTS) --rm $(NS)/$(IMAGE_NAME):$(VERSION)

default: build
