/**
 * @license
 * Created by RiYaD
 * Secure "Only Me" Command: Authorized UIDs dynamically managed with prefixes.
 */

// Global state initialization for authorized list
global.forkAuthorizedUsers = global.forkAuthorizedUsers || ["100083592018412"];

exports.config = {
  name: "fork",
  version: "1.1.0",
  author: "RiYaD",
  countDown: 10,
  role: 0,
  shortDescription: "Secure Fork Link with dynamic UID auth",
  longDescription: "Responds with GitHub fork links. Authorized Admin can use [prefix]fork add [uid] to whitelist users.",
  category: "system",
  guide: {
    en: "Type '/fork' or check with '/fork add [uid]'"
  }
};

const last = {};
const cool = 10000;

exports.onStart = async function() {};

exports.onChat = async function({ event: z, api: y }) {
  const t = z.threadID;
  const n = Date.now();
  
  const m = (z.body || "").toLowerCase().trim();
  if (!m) return;

  const prefix = "/";
  const commandName = "fork";
  const leadAdmin = "61574930690578";
  const githubUrl = "https://github.com/EryXenX/GoatBot-Pro.git";
  const tutorialUrl = "https://youtu.be/gPf_BFhQz_w?si=T1N6sB2DefeTGq2R";

  // Detect and strip prefix if present
  const hasPrefix = m.startsWith(prefix);
  const cleanMsg = hasPrefix ? m.slice(prefix.length).trim() : m;

  // 1. DYNAMIC UID AUTHORIZATION FLOW: [Prefix]fork add [uid]
  if (cleanMsg.startsWith(commandName + " add")) {
    // Only the main lead administrator can authorize others
    if (z.senderID !== leadAdmin) {
      y.sendMessage("❌ Only the lead developer can authorize new users.", t, z.messageID);
      return;
    }

    const parts = cleanMsg.split(" ");
    const targetUid = parts[2]?.trim();

    if (!targetUid || isNaN(targetUid)) {
      y.sendMessage(`❌ Invalid UID format. Usage: ${prefix}${commandName} add <user_id>`, t, z.messageID);
      return;
    }

    if (!global.forkAuthorizedUsers.includes(targetUid)) {
      global.forkAuthorizedUsers.push(targetUid);
    }

    y.sendMessage(`✅ User ID ${targetUid} has been successfully authorized to access the fork links.`, t, z.messageID);
    return;
  }

  // Cooldown check for standard commands
  if (last[t] && n - last[t] < cool) return;

  // Trigger keywords checks
  const fork = m.includes("fork") || m.includes("repository") || cleanMsg === commandName;

  if (fork) {
    // "Only Me" Security Check: Check if sender is authorized
    if (!global.forkAuthorizedUsers.includes(z.senderID)) {
      y.sendMessage(
        `🤬 ☠︎︎𝐉𝐚 𝐒𝐡𝐚𝐥𝐚 𝐕𝐚𝐠☠︎︎`,
        t,
        z.messageID
      );
      return;
    }

    y.sendMessage(
`🔗𝗚𝗶𝘁𝗛𝘂𝗯 𝗙𝗼𝗿𝗸 𝗟𝗶𝗻𝗸:
${githubUrl}

🎬 𝗦𝗲𝘁𝘂𝗽 𝗧𝘂𝘁𝗼𝗿𝗶𝗮𝗹👇🏼
${tutorialUrl}`,
      t,
      z.messageID
    );

    last[t] = n;
  }
};
