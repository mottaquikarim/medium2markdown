NODE_VERSION   := 15
CONTAINER_NAME := medium2markdown
TAG            := dev

build:
	docker build --build-arg NODE_VERSION=${NODE_VERSION} -t ${CONTAINER_NAME}:${TAG} .

build-dev:
	docker build \
		--build-arg PYTHON_VERSION=${PYTHON_VERSION} \
		-t pkglambdalayer_dev:${TAG} dev

lint: build-dev ## Run linting
	docker run \
		-v ${PWD}:/app \
		pkglambdalayer_dev:${TAG} autopep8 --in-place --recursive --global-config=/app/dev/setup.cfg .