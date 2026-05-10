<div align="center">

```
 ██████╗  ██████╗  █████╗ ████████╗    ███╗   ███╗███████╗███████╗███████╗███████╗███╗   ██╗ ██████╗ ███████╗██████╗
██╔════╝ ██╔═══██╗██╔══██╗╚══██╔══╝    ████╗ ████║██╔════╝██╔════╝██╔════╝██╔════╝████╗  ██║██╔════╝ ██╔════╝██╔══██╗
██║  ███╗██║   ██║███████║   ██║       ██╔████╔██║█████╗  ███████╗███████╗█████╗  ██╔██╗ ██║██║  ███╗█████╗  ██████╔╝
██║   ██║██║   ██║██╔══██║   ██║       ██║╚██╔╝██║██╔══╝  ╚════██║╚════██║██╔══╝  ██║╚██╗██║██║   ██║██╔══╝  ██╔══██╗
╚██████╔╝╚██████╔╝██║  ██║   ██║       ██║ ╚═╝ ██║███████╗███████║███████║███████╗██║ ╚████║╚██████╔╝███████╗██║  ██║
 ╚═════╝  ╚═════╝ ╚═╝  ╚═╝   ╚═╝       ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
```

<img src="https://readme-typing-svg.herokuapp.com?font=JetBrains+Mono&weight=700&size=18&duration=3000&pause=800&color=00FFD1&center=true&vCenter=true&width=700&lines=Facebook+Messenger+Bot+Framework;Built+on+Goat+Bot+V2+%E2%80%94+Modified+by+EryXenX;Fast+%E2%80%A2+Smart+%E2%80%A2+Reliable+%E2%80%A2+Powerful" />

<br/>

![Version](https://img.shields.io/badge/Version-2.0.0-00FFD1?style=for-the-badge&logo=github&logoColor=black)
![Node](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Base](https://img.shields.io/badge/Based_on-Goat_Bot_V2-FF6B6B?style=for-the-badge&logo=github&logoColor=white)
![Fork](https://img.shields.io/badge/Fork_by-EryXenX-9B59B6?style=for-the-badge&logo=github&logoColor=white)
![FCA](https://img.shields.io/badge/FCA-fca--eryxenx-00FFD1?style=for-the-badge&logoColor=black)

</div>

---

## ◈ About

**GOAT MESSENGER** is a modified fork of [Goat Bot V2](https://github.com/ntkhang03/Goat-Bot-V2) by **ntkhang03**, enhanced and maintained by **EryXenX**.

### What's Different in This Fork

| Feature | Description |
|---|---|
| 🔌 **Custom FCA** | Uses `fca-eryxenx` — a patched fork with bug fixes and stability improvements |
| ⚙️ **Handler Improvements** | No-prefix system for bot admins, smart command suggestion |
| 🎨 **UI Overhaul** | Redesigned message templates with clean formatting |
| 🛡️ **React Unsend** | Auto-unsend messages on specific emoji reactions |
| 🔧 **Setting Command** | Full bot config control via chat — no need to edit files manually |
| 📦 **Custom Commands** | Extra commands built specifically for this fork |

---

## ◈ Setup

```bash
# 1. Clone the repo
git clone https://github.com/EryXenX/GOAT-MESSENGER.git
cd GOAT-MESSENGER

# 2. Install dependencies
npm install

# 3. Add your Facebook cookies to account.txt
# Format: JSON array (export from browser using EditThisCookie)

# 4. Configure config.json
# Set adminBot, prefix, and other options

# 5. Start the bot
node index.js
```

---

## ◈ Command Structure

Every command lives in `scripts/cmds/` as a `.js` file. Here's the full structure:

```js
module.exports = {
  config: {
    name: "commandname",        // Command name (used as trigger)
    version: "1.0.0",           // Version of the command
    author: "YourName",         // Author name
    countDown: 5,               // Cooldown in seconds
    role: 0,                    // Permission level (see below)
    shortDescription: "...",    // Short description
    longDescription: "...",     // Long description
    category: "fun",            // Category shown in help
    guide: "{prefix}commandname [args]"  // Usage guide
  },

  // ─── Runs when command is triggered ───
  onStart: async function ({ api, event, args, message, getLang }) {
    // event.threadID  → thread/group ID
    // event.senderID  → sender's Facebook ID
    // event.body      → full message text
    // args            → array of arguments after command name
    // message.reply() → reply to the message
    // api.sendMessage() → send a message anywhere

    message.reply("Hello!");
  },

  // ─── Runs when someone replies to the bot's message ───
  onReply: async function ({ api, event, Reply, message }) {
    // Reply.author    → original command caller's ID
    // Reply.messageID → ID of the bot's message being replied to
    message.reply(`You replied: ${event.body}`);
  },

  // ─── Runs when someone reacts to the bot's message ───
  onReaction: async function ({ api, event, Reaction, message }) {
    // event.reaction  → the emoji used
    message.reply(`You reacted with: ${event.reaction}`);
  },

  // ─── Runs on every message in a thread (no prefix needed) ───
  onChat: async function ({ api, event, message }) {
    if (event.body === "hello") message.reply("hi!");
  },

  // ─── Runs on thread events (join, leave, etc.) ───
  onEvent: async function ({ api, event, message }) {
    if (event.logMessageType === "log:subscribe") {
      message.reply("Welcome!");
    }
  }
};
```

---

## ◈ Permission Roles

| Role | Level | Who |
|---|---|---|
| `0` | Everyone | All users |
| `1` | Group Admin | Group administrators only |
| `2` | Bot Admin | Bot admins defined in `config.json` |

---

## ◈ Useful Helpers

```js
// Reply to current message
message.reply("text");

// Send message to any thread
api.sendMessage("text", threadID);

// Send with attachment
api.sendMessage({ body: "text", attachment: stream }, threadID);

// React to a message
api.setMessageReaction("✅", event.messageID, () => {}, true);

// Unsend bot's own message
api.unsendMessage(messageID);

// Get thread info
const info = await api.getThreadInfo(threadID);

// Get user info
const user = await api.getUserInfo(userID);

// Get current bot ID
const botID = api.getCurrentUserID();
```

---

## ◈ onReply Pattern

```js
// In onStart — send a message and register a reply listener
const sent = await message.reply("What's your name?");
global.GoatBot.onReply.set(sent.messageID, {
  commandName: "mycommand",
  messageID: sent.messageID,
  author: event.senderID,
  // any extra data you want to pass
  step: 1
});

// In onReply — handle the reply
onReply: async function ({ api, event, Reply, message }) {
  if (event.senderID !== Reply.author) return; // only original caller
  message.reply(`Hello, ${event.body}!`);
}
```

---

## ◈ Event Types

```js
switch (event.logMessageType) {
  case "log:subscribe":       // User joined the group
  case "log:unsubscribe":     // User left the group
  case "log:thread-name":     // Group name changed
  case "log:thread-image":    // Group photo changed
  case "log:thread-admins":   // Admin list changed
}
```

---

## ◈ config.json Key Options

```json
{
  "prefix": "-",
  "adminBot": ["your_facebook_id"],
  "noPrefix": {
    "enable": false
  },
  "reactUnsend": {
    "enable": true,
    "onlyAdmin": true,
    "emojis": ["😡"]
  },
  "optionsFca": {
    "listenEvents": true,
    "autoMarkDelivery": false,
    "updatePresence": false,
    "selfListen": false,
    "autoReconnect": true
  }
}
```

---

## ◈ Support

<div align="center">

[![Messenger Group](https://img.shields.io/badge/Join%20Support%20Group-0084FF?style=for-the-badge&logo=messenger&logoColor=white)](https://m.me/j/AbayU2oh5OPVLvZm/?send_source=gc%3Acopy_invite_link_c)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://facebook.com/EryXenX)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/EryXenX)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/@EryXenX)

</div>

---

## ◈ Credits

| Role | Person | Link |
|---|---|---|
| 🏆 **Original Creator** | NTKhang | [Goat Bot V2](https://github.com/ntkhang03/Goat-Bot-V2) |
| 🔧 **This Fork** | EryXenX | [GOAT-MESSENGER](https://github.com/EryXenX/GOAT-MESSENGER) |

> All core copyright belongs to **NTKhang (ntkhang03)**. This fork does not override the original license.

---

<div align="center">
  <sub>Built on the shoulders of giants · Respect Open Source · Credit your sources</sub>
  <br/>
  <sub><b>Original Work © NTKhang (ntkhang03) &nbsp;|&nbsp; Fork by EryXenX</b></sub>
</div>
