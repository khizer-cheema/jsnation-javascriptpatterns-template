//from notebook
const twilio = require("twilio");
const nodemailer = require("nodemailer");
const { WebClient } = require("@slack/web-api");

// ------------------------------
// Email Adapter
// ------------------------------
const createEmailAdapter = (service, auth) => {
  const transporter = nodemailer.createTransport({ service, auth });

  return async (message, recipient) => {
    await transporter.sendMail({
      from: auth.user,
      to: recipient,
      subject: "Notification",
      text: message,
    });
    console.log("✅ Email sent!");
  };
};

// ------------------------------
// SMS Adapter
// ------------------------------
const createSMSAdapter = (sid, token, from) => {
  const client = twilio(sid, token);

  return async (message, recipient) => {
    await client.messages.create({
      body: message,
      from,
      to: recipient,
    });
    console.log("✅ SMS sent!");
  };
};

// ------------------------------
// Slack Adapter
// ------------------------------
const createSlackAdapter = (token, channel = "#notifications") => {
  const client = new WebClient(token);

  return async (message) => {
    await client.chat.postMessage({
      channel,
      text: message,
    });
    console.log("✅ Slack message sent!");
  };
};

// ------------------------------
// Notification Service
// ------------------------------
async function sendNotification(adapter, message, recipient) {
  try {
    await adapter(message, recipient);
  } catch (error) {
    console.error("❌ Error sending notification:", error.message);
  }
}

// ------------------------------
// Usage Example
// ------------------------------
(async () => {
  const emailAdapter = createEmailAdapter("gmail", {
    user: "your-email@gmail.com",
    pass: "your-password",
  });

  const smsAdapter = createSMSAdapter(
    "your-twilio-sid",
    "your-twilio-token",
    "+1234567890"
  );

  const slackAdapter = createSlackAdapter("your-slack-token", "#general");

  await sendNotification(
    emailAdapter,
    "Hello via Email!",
    "recipient@example.com"
  );
  await sendNotification(smsAdapter, "Hello via SMS!", "+1987654321");
  await sendNotification(slackAdapter, "Hello via Slack!"); // no recipient needed
})();
