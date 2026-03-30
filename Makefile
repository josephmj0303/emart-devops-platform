build:
	docker build -t emart-client ./app/client
	docker build -t emart-node ./app/nodeapi
	docker build -t emart-java ./app/javaapi

push:
	docker push $(IMAGE)

deploy:
	kubectl apply -k k8s/overlays/dev
