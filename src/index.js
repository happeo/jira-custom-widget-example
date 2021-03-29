const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const { jiraClient, processSettings } = require("./services/jira");
const { getSettings, saveSettings } = require("./services/firestore");
const {
  createSession,
  verifySession,
  verifySharedToken,
} = require("./services/jwt");
const { COOKIE_NAME } = require("./constants");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.post("/api/verify", async (req, res) => {
  try {
    const { token } = req.body;
    const validatedData = verifySharedToken(token);

    const session = createSession({
      id: validatedData.id,
      primaryEmail: validatedData.primaryEmail,
      organisationId: validatedData.organisationId,
    });

    res.cookie(COOKIE_NAME, session, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.send({ result: "ok" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/api/issues", async (req, res) => {
  try {
    const user = verifySession(req.cookies[COOKIE_NAME]);
    const jiraSettings = await getSettings(user);

    if (!jiraSettings) {
      throw new Error("NO SETTINGS");
    }
    console.log(jiraSettings);
    const processedSettings = processSettings(jiraSettings, user);
    console.log(processedSettings);
    const client = jiraClient(jiraSettings);
    console.log(client);
    const data = await client.searchJira(processSettings(jiraSettings, user));

    res.send(data);
  } catch (error) {
    res.sendStatus(error);
  }
});

app.get("/api/setup", async (req, res) => {
  try {
    const user = verifySession(req.cookies[COOKIE_NAME]);

    const data = await getSettings(user);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/api/setup", async (req, res) => {
  try {
    const user = verifySession(req.cookies[COOKIE_NAME]);

    const data = await saveSettings(user, req.body);
    res.send(data);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.use(function (req, res, next) {
  res.set("Cache-control", "no-cache");
  next();
});

// Serve any static files
app.use(express.static(path.join(__dirname, "../client/build")));

// Handle React routing, return all requests to React app
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Custom widget example: listening on port ${port}`);
});
