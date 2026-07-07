/**
 * @file cam.js
 * @version 1.0
 * @author Riyad
 * @description A custom Camera Bot command module with Cam In (CI) and Cam Out (CO) commands.
 * Compatible with popular Messenger Bot frameworks (such as GoatBot, Mirai, or custom Node.js frameworks).
 */

// Local bot state to track if the bot is active (cam in) or inactive (cam out)
let isBotActive = true; 

// Track cooldown timestamp for the countdown feature
const cooldowns = new Map();

module.exports = {
  config: {
    name: "cam",
    version: "1.0",
    author: "Riyad",
    countDown: 25, // Countdown cooldown in seconds to prevent spamming
    role: 0, // 0 = All users, 1 = Group admins, 2 = Bot operators/admins
    aliases: ["ci", "co", "camin", "camout"],
    description: "Activate (CI/cam in) or deactivate (CO/cam out) the bot messenger module.",
    category: "system",
    guide: {
      en: "Use 'cam in' or 'CI' to activate. Use 'cam out' or 'CO' to deactivate.",
      bn: "বট চালু করতে 'cam in' অথবা 'CI' ব্যবহার করুন। বন্ধ করতে 'cam out' অথবা 'CO' ব্যবহার করুন।"
    }
  },

  /**
   * Main execution function for Mirai & GoatBot systems
   */
  onStart: async function ({ api, event, args, reply, message }) {
    const { threadID, messageID, senderID } = event;
    const input = (args || []).join(" ").trim().toLowerCase();
    const trigger = input || "";

    // Helper to send messages across multiple bot APIs
    const sendMsg = (text) => {
      if (typeof reply === "function") {
        return reply(text);
      } else if (api && typeof api.sendMessage === "function") {
        return api.sendMessage(text, threadID, messageID);
      } else if (message && typeof message.reply === "function") {
        return message.reply(text);
      } else {
        console.log(`[CamBot] Response: ${text}`);
      }
    };

    // Cooldown verification check
    const cooldownTime = (module.exports.config.countDown || 25) * 1000;
    const now = Date.now();
    if (cooldowns.has(senderID)) {
      const expirationTime = cooldowns.get(senderID) + cooldownTime;
      if (now < expirationTime) {
        const timeLeft = Math.ceil((expirationTime - now) / 1000);
        return sendMsg(`⚠️ Please wait ${timeLeft} seconds before using this command again sir.`);
      }
    }
    
    cooldowns.set(senderID, now);

    // Command execution dispatch
    if (trigger === "in" || trigger === "cam in" || trigger === "ci") {
      if (isBotActive) {
        return sendMsg("🤖 Sir, I am already active and ready to serve you!");
      }
      isBotActive = true;
      return sendMsg(`✨🌀⚡◈◈◈◈◈◈◈◈◈◈◈◈◈◈⚡🌀✨
💬 আমাকে ডাকার জন্য ধন্যবাদ 𝐑𝐈𝐘𝐀𝐃 স্যার।
🚀 বলুন আমি আপনার জন্য কী করতে পারি?
✨🌀⚡◈◈◈◈◈◈◈◈◈◈◈◈◈◈⚡🌀✨`);
    } 
    
    else if (trigger === "out" || trigger === "cam out" || trigger === "co") {
      if (!isBotActive) {
        return sendMsg("💤 Sir, I am already inactive (offline). Type 'cam in' or 'CI' to call me back!");
      }
      isBotActive = false;
      return sendMsg(`✨🌀⚡◈◈◈◈◈◈◈◈◈◈◈◈◈◈⚡🌀✨
💬 ঠিক আছে 𝐑𝐈𝐘𝐀𝐃 স্যার, আমি যাচ্ছি।
⌛ পরে ডাকবেন, আমি সাথে সাথে
✨ চলে আসবো!
✨🌀⚡◈◈◈◈◈◈◈◈◈◈◈◈◈◈⚡🌀✨`);
    } 
    
    else {
      const statusText = isBotActive ? "🟢 ACTIVE" : "🔴 OFFLINE / SLEEPING";
      return sendMsg(
        `📌 [ Riyad Camera Bot Module v1.0 ]\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `• Current Status: ${statusText}\n` +
        `• Author: Riyad\n` +
        `• Commands:\n` +
        `  - cam in / CI : Active the bot\n` +
        `  - cam out / CO : Deactive the bot\n\n` +
        `💡 Example: /cam in`
      );
    }
  },

  /**
   * Listen / handle other messages to filter if the bot is off
   */
  onChat: async function ({ api, event, reply }) {
    if (!isBotActive) {
      const messageText = (event.body || "").trim().toLowerCase();
      if (
        messageText.startsWith("cam in") || 
        messageText === "ci" || 
        messageText.startsWith("/cam in") || 
        messageText.startsWith("!cam in")
      ) {
        return; // Allow activation command
      }
      return; // Ignore other text when turned off
    }
  }
};
