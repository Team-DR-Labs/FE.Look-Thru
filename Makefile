build-push: 
	gcloud builds submit --tag asia-northeast3-docker.pkg.dev/dr-labs-kr/look-thru-repo/look-thru-app

deploy:
	gcloud run deploy look-thru-service \
	--image asia-northeast3-docker.pkg.dev/dr-labs-kr/look-thru-repo/look-thru-app \
	--platform managed \
	--region asia-northeast3 \
	--allow-unauthenticated \
	--set-secrets=GEMINI_API_KEY=gemini-api-key:latest

staging-deploy:
	gcloud run deploy look-thru-staging-service \
	--image asia-northeast3-docker.pkg.dev/dr-labs-kr/look-thru-repo/look-thru-app \
	--platform managed \
	--region asia-northeast3 \
	--allow-unauthenticated \
	--set-env-vars GEMINI_API_KEY=gemini-api-key:latest