const twilio = require("twilio");
const nodemailer = require("nodemailer");
const { WebClient } = require("@slack/web-api");

// Base Adapter
class NotificationAdapter {
  async send(message, recipient) {
    throw new Error("Method 'send' must be implemented");
  }
}
/**
 * In ES6 classes:
-If your class extends another class and you define a constructor, you must call super() before using this.
-This is required even if the parent class (NotificationAdapter in this case) doesn’t have its own constructor.
-Why?
Because super() calls the parent’s constructor (or, if there isn’t one, it ensures the inheritance chain is correctly set up under the hood).
If NotificationAdapter has no constructor, JavaScript creates an empty constructor automatically,even if it does nothing:
class NotificationAdapter {
  constructor(...args) {
  }
}

 */
// Email Adapter
class EmailAdapter extends NotificationAdapter {
  constructor(user, pass) {
    super();
    this.user = user;
    this.pass = pass;
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: this.user, pass: this.pass },
    });
  }

  async send(message, recipient) {
    await this.transporter.sendMail({
      from: this.user,
      to: recipient,
      subject: "Notification",
      text: message,
    });
  }
}

// SMS Adapter
class SMSAdapter extends NotificationAdapter {
  constructor(sid, token, from) {
    super();
    this.client = twilio(sid, token);
    this.from = from;
  }

  async send(message, recipient) {
    await this.client.messages.create({
      body: message,
      from: this.from,
      to: recipient,
    });
  }
}

// Slack Adapter
class SlackAdapter extends NotificationAdapter {
  constructor(token) {
    super();
    this.client = new WebClient(token);
  }

  async send(message, channel = "#notifications") {
    await this.client.chat.postMessage({
      channel,
      text: message,
    });
  }
}

// Notification service
async function sendNotification(adapter, message, recipient) {
  try {
    await adapter.send(message, recipient);
    /*adapter.constructor
Every JavaScript object has a reference to the constructor function that created it.
.name
The name property on a function/class gives the name of the class or function.

*/
    console.log(`✅ Notification sent via ${adapter.constructor.name}`);
  } catch (error) {
    console.error(
      `❌ Error sending notification via ${adapter.constructor.name}:`,
      error.message
    );
  }
}

// ------------------------------
// Usage Example
// ------------------------------
(async () => {
  const emailAdapter = new EmailAdapter(
    "your-email@gmail.com",
    "your-password"
  );
  const smsAdapter = new SMSAdapter(
    "your-twilio-sid",
    "your-twilio-token",
    "+1234567890"
  );
  const slackAdapter = new SlackAdapter("your-slack-token");

  await sendNotification(
    emailAdapter,
    "Hello via Email!",
    "recipient@example.com"
  );
  await sendNotification(smsAdapter, "Hello via SMS!", "+1987654321");
  await sendNotification(slackAdapter, "Hello via Slack!", "#general");
})();
