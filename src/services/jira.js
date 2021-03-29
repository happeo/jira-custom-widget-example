const JiraApi = require("jira-client");

const jiraClient = ({ jiraHost, jiraUsername, jiraPassword }) =>
  new JiraApi({
    protocol: "https",
    host: jiraHost,
    username: jiraUsername,
    password: jiraPassword,
    apiVersion: "2",
    strictSSL: true,
  });

function processSettings({ jql = "" }, { primaryEmail = "" }) {
  const emailEncoded = primaryEmail.replace("@", "\\u0040");
  return jql.replace(/{primaryEmail}/g, emailEncoded);
}

module.exports = { jiraClient, processSettings };
