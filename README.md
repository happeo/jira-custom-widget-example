# jira-custom-widgets-example

Example on how to enable custom widget communication with Happeo. Please note that this code is not production ready, treat this as an example.

## Getting this up and running

Since we need the Backend to verify the incoming JWT, we need both the React app and NodeJS server to be running at the same time. To do that, run npm install on root and under `/client`.

### Add secrets

This server uses Firestore to store the Jira credentials. To make Firestore accessible in local, you need to create `.secrets` -folder under root and place your gcp service account json there.

### Commands

Then run `npm run dev`

This will start the server and build the React app. You can access the app in `localhost:8080`

### Recommended improvements

When you change the React app, it will build a prod build after which you can see the results. I recommend improving at least 3 things:

- Get the React app working without the server for development purposes
- When React app changes, see if you can make the build faster
- When the React build is done, automatically refresh the page

## Deploying

The app is designed to run in CloudRun. To deploy this to CloudRun you should be familiar with that. To deploy a new version of this to the container registry, you can run `npm run deploy`. But before doing that, check the `package.json` and script `deploy`. It references to `gcr.io/custom-widgets-examples/jira`, which you should change to your GCP project and CloudRun app name.
