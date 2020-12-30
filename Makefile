NS = techteam
VERSION = latest
IMAGE_NAME = template_project
CONTAINER_NAME = template_project
PORTS = 3001:3000

ifdef OS
	# Windows solution
	DIR := $(subst C:,c:,$(subst \,\\,$(shell cmd.exe /c cd)))
else
	DIR = ${PWD}
endif

build: Dockerfile
	docker build -t $(NS)/$(IMAGE_NAME):$(VERSION) -f Dockerfile .

run:
	docker run -v $(DIR):/app -v /app/node_modules -p $(PORTS) --rm $(NS)/$(IMAGE_NAME):$(VERSION)

stop:
	docker stop $(CONTAINER_NAME)

delete:
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME)

start: Dockerfile
	docker build -t $(NS)/$(IMAGE_NAME):$(VERSION) -f Dockerfile .
	docker run -v $(DIR):/app -v /app/node_modules -p $(PORTS) --rm $(NS)/$(IMAGE_NAME):$(VERSION)

default: build
