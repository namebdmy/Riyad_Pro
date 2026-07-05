const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "1.3.0",
    author: "Mᴏʜᴀᴍᴍᴀᴅ Aᴋᴀsʜ",
    role: 0,
    shortDescription: "Owner information with image",
    category: "Information",
    guide: {
      en: "owner"
    }
  },

  onStart: async function ({ api, event }) {
    const ownerText = 
`‎╔══ ❖ 👑 𝑶𝑾𝑵𝑬𝑹 𝑰𝑵𝑭𝑶 👑 ❖ ══╗
‎
‎❖ 👤 𝑵𝒂𝒎𝒆     ⟿ 𝑩𝒂𝒅 𝑩𝒐𝒚 𝑹𝒊𝒚𝒂𝒅
‎❖ 🧸 𝑵𝒊𝒄𝒌     ⟿ 𝑹𝒊𝒚𝒂𝒅
‎❖ 🎂 𝑨𝒈𝒆      ⟿ 18+
‎❖ 💘 𝑹𝒆𝒍𝒂𝒕𝒊𝒐𝒏   ⟿ 𝑺𝒊𝒏𝒈𝒍𝒆
‎❖ 🎓 𝑷𝒓𝒐𝒇𝒆𝒔𝒔𝒊𝒐𝒏  ⟿ 𝑺𝒕𝒖𝒅𝒆𝒏𝒕
‎❖ 📚 𝑬𝒅𝒖𝒄𝒂𝒕𝒊𝒐𝒏  ⟿ 𝑰𝒏𝒕𝒆𝒓 2𝒏𝒅 𝒀𝒆𝒂𝒓
‎❖ 🏡 𝑳𝒐𝒄𝒂𝒕𝒊𝒐𝒏   ⟿ 𝑩𝒐𝒈𝒖𝒓𝒂 • 𝑺𝒉𝒆𝒓𝒑𝒖𝒓
‎
‎╠════ 🔗 𝑪𝑶𝑵𝑻𝑨𝑪𝑻 🔗 ═════╣
‎
‎📘 𝑭𝒂𝒄𝒆𝒃𝒐𝒐𝒌   ➜ fb.com/badboyriyad 
‎💬 𝑰𝒏𝒔𝒕𝒂𝒈𝒓𝒂𝒎 ➜ insta.com/chocoriyad 
📞 𝑾𝒉𝒂𝒕𝒔𝑨𝒑𝒑 ➜ wa.me/01863691054
‎
‎╚═══ ❖ 💎 𝑻𝒉𝒂𝒏𝒌 𝒀𝒐𝒖 💎 ❖ ═══╝`;

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "owner.jpg");

    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    const imgLink = "https://i.imgur.com/1G4ZhU7.jpeg";

    const send = () => {
      api.sendMessage(
        {
          body: ownerText,
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        () => fs.unlinkSync(imgPath),
        event.messageID
      );
    };

    request(encodeURI(imgLink))
      .pipe(fs.createWriteStream(imgPath))
      .on("close", send);
  }
};
