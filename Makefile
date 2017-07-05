BUILD_NAME:=character-app
IMAGE_NAME:=theoperatore/alorg:character-app-latest
GIT_HASH:=$(shell git rev-parse --short HEAD)
DEPLOY_HOST:=character.alorg.net
DEPLOY_STAGING_HOST:=character-staging.alorg.net

package:
	docker build -t "${BUILD_NAME}" -f ./Dockerfile .
	docker run --rm "${BUILD_NAME}" yarn test
	docker run --rm -e BUILD_VERSION=${GIT_HASH} -v ${PWD}/build:/app/build -w /app "${BUILD_NAME}" yarn build-ci
	docker build -t "${IMAGE_NAME}" -f ./Dockerfile.nginx .

push:
	docker push "${IMAGE_NAME}"

deploy-staging:
	ssh root@${DEPLOY_STAGING_HOST} 'bash -s' < ./image-upgrade.sh '${IMAGE_NAME}'

deploy:
	ssh root@${DEPLOY_HOST} 'bash -s' < ./image-upgrade.sh '${IMAGE_NAME}'
