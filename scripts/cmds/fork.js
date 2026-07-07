/**
 * @license
 * Created by EryXenX
 * Protected Command: Only Authorized Admin can access private setup/fork links.
 */

exports.config = {
  name: "fork",
  version: "1.1.1",
  author: "RiYaD",
  countDown: 10,
  role: 0,
  shortDescription: "Secure Fork Link",
  longDescription: "Responds with GitHub fork and setup tutorial links. Secured with Admin-only access.",
  category: "system",
  guide: {
    en: "Type 'fork' or 'repository'"
  }
};

const last = {};
const cool = 10000;

exports.onStart = async function() {};

exports.onChat = async function({ event: z, api: y }) {
  const t = z.threadID;
  const n = Date.now();
  
  // Cooldown check
  if (last[t] && n - last[t] < cool) return;

  const m = (z.body || "").toLowerCase().trim();
  if (!m) return;

  const fork = m.includes("fork") || m.includes("repository");
  const allowedSenderID = "100083592018412";
  const githubUrl = "https://github.com/EryXenX/GoatBot-Pro.git";
  const tutorialUrl = "https://youtu.be/gPf_BFhQz_w?si=T1N6sB2DefeTGq2R";

  // "Only Me" Security Check: Check if sender is the authorized user
  if (z.senderID !== allowedSenderID) {
    // Silently ignore unauthorized users
    return;
  }

  if (fork) {
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
