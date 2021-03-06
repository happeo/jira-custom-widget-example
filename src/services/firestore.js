const admin = require("firebase-admin");

const credential =
  process.env.NODE_ENV === "production"
    ? admin.credential.applicationDefault()
    : admin.credential.cert(require("../../.secrets/gcp-service-account.json"));

admin.initializeApp({
  credential,
});

const db = admin.firestore();

async function getSettings(user) {
  try {
    const ref = db.collection("jira").doc(`organisation_${user.orgId}`);
    const doc = await ref.get();
    if (!doc.exists) {
      console.log("No such document!");
      return null;
    }
    return {
      ...doc.data(),
      id: doc.id,
    };
  } catch (error) {
    throw error;
  }
}

async function saveSettings(user, data) {
  try {
    const ref = db.collection("jira").doc(`organisation_${user.orgId}`);
    await ref.set(
      {
        ...data,
        updatedMillis: admin.firestore.Timestamp.fromDate(new Date()),
        updatedBy: user.userId,
      },
      { merge: true },
    );
    return {
      ...data,
      updatedMillis: admin.firestore.Timestamp.fromDate(new Date()),
      updatedBy: user.userId,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getSettings,
  saveSettings,
};
