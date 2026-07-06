const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Renz API JSON URL (GoatBot-V2 standard)
const noobcore = "https://raw.githubusercontent.com/noobcore404/NC-STORE/main/NCApiUrl.json";

// Memory cache for Renz API URL to make it fast
let cachedRenzUrl = null;
let cacheTime = 0;

async function getRenzApi() {
  // If we have cached URL and it is less than 30 minutes old, return it instantly
  if (cachedRenzUrl && (Date.now() - cacheTime < 30 * 60 * 1000)) {
    return cachedRenzUrl;
  }
  
  try {
    const res = await axios.get(noobcore, { timeout: 10000 });
    if (res.data?.renz) {
      cachedRenzUrl = res.data.renz;
      cacheTime = Date.now();
      return cachedRenzUrl;
    }
  } catch (err) {
    // If request fails but we have cached URL, fallback to it
    if (cachedRenzUrl) {
      console.warn("Using stale cached Renz API URL due to fetch error:", err.message);
      return cachedRenzUrl;
    }
    throw err;
  }
  throw new Error("Renz API not found in JSON");
}

module.exports = {
  config: {
    name: "edit",
    aliases: ["nanobanana", "gptimage"],
    version: "7.8",
    author: "RiYaD",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Generate or edit images using text prompts"
    },
    longDescription: {
      en: "Generate or edit images using text prompts"
    },
    category: "image",
    guide: {
      en: "{pn} <prompt> | Reply to an image with your prompt"
    }
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID, messageReply } = event;
    const prompt = args.join(" ").trim();

    if (!prompt) {
      return api.sendMessage(
        "❌ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝗮 𝗽𝗿𝗼𝗺𝗽𝘁.\n\n💡 𝙀𝙭𝙖𝙢𝙥𝙡𝙚𝙨:\n• !edit a cyberpunk city\n• !edit make me anime (reply to an image)",
        threadID,
        messageID
      );
    }

    const loadingMsg = await api.sendMessage("⏳ Pʀᴏᴄᴇssɪɴɢ ʏᴏᴜʀ ɪᴍᴀɢᴇ, ᴘʟᴇᴀsᴇ ᴡᴀɪᴛ...", threadID, messageID);

    const imgPath = path.join(__dirname, "cache", `${Date.now()}_gptgen.png`);

    try {
      // 1. Fetch Renz API URL (cached for extreme speed)
      const BASE_URL = await getRenzApi();
      let apiURL = `${BASE_URL}/api/gptimage?prompt=${encodeURIComponent(prompt)}`;

      // 2. Handle replied photo/image attachment
      const repliedAttachment = messageReply?.attachments?.[0];
      if (repliedAttachment && (repliedAttachment.type === "photo" || repliedAttachment.type === "image")) {
        apiURL += `&ref=${encodeURIComponent(repliedAttachment.url)}`;
        if (repliedAttachment.width && repliedAttachment.height) {
          apiURL += `&width=${repliedAttachment.width}&height=${repliedAttachment.height}`;
        }
      } else {
        apiURL += `&width=512&height=512`;
      }

      // 3. Request the image from the API
      const res = await axios.get(apiURL, {
        responseType: "arraybuffer",
        timeout: 180000 // 3 minutes timeout for image generation
      });

      // 4. Save the image to temporary cache folder
      fs.mkdirSync(path.dirname(imgPath), { recursive: true });
      fs.writeFileSync(imgPath, res.data);

      // 5. Safely unsend the loading message
      try {
        if (loadingMsg && loadingMsg.messageID) {
          await api.unsendMessage(loadingMsg.messageID);
        }
      } catch (unsendErr) {
        console.error("Failed to unsend loading message:", unsendErr.message);
      }

      // 6. Build the beautiful response text
      const bodyText = `✧━━━━━━━━━━━━━━━━✧\n  🎨  𝗜𝗠𝗔𝗚𝗘 𝗚𝗘𝗡𝗘𝗥𝗔𝗧𝗢𝗥  🎨\n✧━━━━━━━━━━━━━━━━✧\n\n👑 𝗖𝗿𝗲𝗮𝘁𝗲𝗱 𝗕𝘆 – 𝗥𝗶𝗬𝗮𝗗\n\n✨ Here your image ✨\n📝 𝗣𝗿𝗼𝗺𝗽𝘁: ${prompt}\n\n✧━━━━━━━━━━━━━━━━✧`;

      // 7. Send the generated image and delete the temporary file
      await api.sendMessage(
        {
          body: bodyText,
          attachment: fs.createReadStream(imgPath)
        },
        threadID,
        (err) => {
          if (err) console.error("Error sending image:", err);
          if (fs.existsSync(imgPath)) {
            try {
              fs.unlinkSync(imgPath);
            } catch (unlinkErr) {
              console.error("Failed to delete temp image file:", unlinkErr.message);
            }
          }
        },
        messageID
      );

    } catch (err) {
      console.error("GPTGEN Error:", err?.response?.data || err.message);
      
      // Attempt to clean up loading message in case of failure
      try {
        if (loadingMsg && loadingMsg.messageID) {
          await api.unsendMessage(loadingMsg.messageID);
        }
      } catch (unsendErr) {
        // Ignore unsend error on failure
      }
      
      // Clean up temp file if it exists
      if (fs.existsSync(imgPath)) {
        try {
          fs.unlinkSync(imgPath);
        } catch (unlinkErr) {}
      }

      api.sendMessage("❌ Fᴀɪʟᴇᴅ ᴛᴏ ᴘʀᴏᴄᴇss ɪᴍᴀɢᴇ. Pʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.", threadID, messageID);
    }
  }
};
