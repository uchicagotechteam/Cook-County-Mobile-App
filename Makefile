NS = techteam
VERSION = latest
IMAGE_NAME = template_project
CONTAINER_NAME = template_project
PORTS = 3001:3000

ifdef OS
	DIR = $(subst /,\,${PWD})

	# The following would also work, but I'm not sure if everyone on windows will have cygwin, so I figure a contained solution is probably better
	# DIR = `cygpath -w "$$(pwd)"`
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
