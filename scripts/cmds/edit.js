const fs = require("fs");
const path = require("path");
const axios = require("axios");

// Memory cache for Arafat API URL to make it fast
let cachedApiUrl = null;
let cacheTime = 0;

const githubJson = "https://raw.githubusercontent.com/Arafat-Core/cmds/refs/heads/main/api.json";

async function getArafatApi() {
  if (cachedApiUrl && (Date.now() - cacheTime < 30 * 60 * 1000)) {
    return cachedApiUrl;
  }
  try {
    const res = await axios.get(githubJson, { timeout: 10000 });
    if (res.data?.api) {
      cachedApiUrl = res.data.api;
      cacheTime = Date.now();
      return cachedApiUrl;
    }
  } catch (err) {
    if (cachedApiUrl) {
      console.warn("Using stale cached Arafat API URL due to fetch error:", err.message);
      return cachedApiUrl;
    }
    throw err;
  }
  throw new Error("API load error from JSON");
}

module.exports = {
  config: {
    name: "edit",
    aliases: ["e"],
    author: "RiYaD",
    version: "4.4",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Edit images using text prompts"
    },
    longDescription: {
      en: "Edit images using text prompts"
    },
    category: "image",
    guide: {
      en: "{pn} <prompt> | Reply to an image with your prompt or use <image_url> <prompt>"
    }
  },

  onStart: async function ({ message, args, api, event }) {
    const { threadID, messageID, messageReply } = event;
    let imageUrl, prompt;

    // High compatibility helper for GoatBot V2 message system
    const sendReply = async (msgObj) => {
      if (message && typeof message.reply === "function") {
        return await message.reply(msgObj);
      } else {
        return await api.sendMessage(msgObj, threadID, messageID);
      }
    };

    // Support both event.messageReply and arguments image URL
    if (messageReply?.attachments?.length > 0 && (messageReply.attachments[0].type === "photo" || messageReply.attachments[0].type === "image")) {
      imageUrl = messageReply.attachments[0].url;
      prompt = args.join(" ").trim();
    } else if (args.length >= 2) {
      imageUrl = args[0];
      prompt = args.slice(1).join(" ").trim();
    } else {
      return sendReply("❌ 𝐌𝐢𝐬𝐬𝐢𝐧𝐠 𝐢𝐦𝐚𝐠𝐞 𝐨𝐫 𝐩𝐫𝐨𝐦𝐩𝐭.\n\n💡 𝙂𝙪𝙞𝙙𝙚: Reply to an image with a prompt, or use: !edit <image_url> <prompt>");
    }

    if (!prompt) {
      return sendReply("❌ 𝐏𝐫𝐨𝐦𝐩𝐭 𝐦𝐢𝐬𝐬𝐢𝐧𝐠.");
    }

    const waitMsg = await sendReply("⏳ Pʀᴏᴄᴇssɪɴɢ ʏᴏᴜʀ ɪᴍᴀɢᴇ, ᴘʟᴇᴀsᴇ ᴡᴀɪᴛ...");
    const waitMsgID = waitMsg?.messageID;

    const cacheDir = path.join(__dirname, "cache");
    const filePath = path.join(cacheDir, `${Date.now()}_edited.png`);

    try {
      // Get base API URL from cached fetch
      const baseApi = await getArafatApi();
      const API_URL = `${baseApi}/arafatedit`;

      // Request to edit the image
      const response = await axios.post(API_URL, {
        prompt: prompt,
        image_urls: [imageUrl],
        font: "Poppins"
      });

      if (!response.data || !response.data.image_url) {
        throw new Error("API did not return any image URL");
      }

      const editedUrl = response.data.image_url;

      // Fetch the edited image as arraybuffer
      const fileBuffer = await axios.get(editedUrl, { 
        responseType: "arraybuffer",
        timeout: 180000 
      });

      // Write to temp file
      fs.mkdirSync(cacheDir, { recursive: true });
      fs.writeFileSync(filePath, fileBuffer.data);

      // Safely unsend loading message
      try {
        if (waitMsgID) {
          await api.unsendMessage(waitMsgID);
        }
      } catch (unsendErr) {
        console.error("Failed to unsend loading message:", unsendErr.message);
      }

      // Build the beautiful response text
      const bodyText = `✧━━━━━━━━━━━━━━━━✧\n  🎨  𝗚𝗣𝗧 𝗜𝗠𝗔𝗚𝗘 𝗘𝗗𝗜𝗧𝗢𝗥  🎨\n✧━━━━━━━━━━━━━━━━✧\n\n👑 𝗖𝗿𝗲𝗮𝘁𝗲𝗱 𝗕𝘆 – 𝗥𝗶𝗬𝗮𝗗\n\n✨ Here your image ✨\n📝 𝗣𝗿𝗼𝗺𝗽𝘁: ${prompt}\n\n✧━━━━━━━━━━━━━━━━✧`;

      // Send the completed edited image and delete temp file
      await sendReply({
        body: bodyText,
        attachment: fs.createReadStream(filePath)
      });

      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (unlinkErr) {
          console.error("Failed to delete temp image file:", unlinkErr.message);
        }
      }

    } catch (err) {
      console.error("Edit Command Error:", err?.response?.data || err.message);

      // Try to clean up wait message
      try {
        if (waitMsgID) {
          await api.unsendMessage(waitMsgID);
        }
      } catch (unsendErr) {}

      // Clean up temp file
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (unlinkErr) {}
      }

      api.sendMessage("❌ Fᴀɪʟᴇᴅ ᴛᴏ ᴇᴅɪᴛ ɪᴍᴀɢᴇ. Pʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.", threadID, messageID);
    }
  }
};
