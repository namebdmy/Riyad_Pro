/**
 * Optimized and Enhanced Video Downloader Command for Messenger Bot
 * Owner: Riyad 🌸
 * 
 * Performance & Speed Improvements:
 * 1. Global caching of GitHub base API URL to eliminate repeated HTTP requests.
 * 2. Optimized reaction triggers to provide immediate feedback to users.
 * 3. Graceful fallback URL check in case GitHub raw contents is unresponsive.
 * 4. Beautifulized title outputs with custom symbols, emojis, and unicode stylings.
 */

const axios = require("axios");
const fs = require('fs');
const path = require('path');

// Cache the API URL in global memory to load faster and improve the search speed
let cachedBaseApiUrl = null;

const baseApiUrl = async () => {
        if (cachedBaseApiUrl) return cachedBaseApiUrl;
        try {
                const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json", { timeout: 5000 });
                if (base.data && base.data.mahmud) {
                        cachedBaseApiUrl = base.data.mahmud;
                        return cachedBaseApiUrl;
                }
        } catch (err) {
                console.error("Failed to fetch base API, using fallback:", err.message);
        }
        // Fallback API if Github raw is down or slow
        return ["https://mahmud-rest-api-v9.onrender.com"];
};

module.exports = {
        config: {
                name: "video",
                aliases: ["ভিডিও", "vidio", "vid"],
                version: "2.0",
                author: "Riyad",
                countDown: 5,
                role: 0,
                description: {
                        bn: "ইউটিউব থেকে ভিডিও ডাউনলোড করুন (নাম বা লিঙ্ক দিয়ে) - রিয়াদের বিশেষ সংস্করণ 🌸",
                        en: "Download video from YouTube (by name or link) - Riyad's Special Edition 🌸",
                        vi: "Tải video từ YouTube (theo tên hoặc liên kết) - Phiên bản Riyad 🌸"
                },
                category: "media",
                guide: {
                        bn: '   {pn} <নাম বা লিঙ্ক>: ভিডিও ডাউনলোড করতে নাম বা লিঙ্ক দিন',
                        en: '   {pn} <name or link>: Provide video name or link',
                        vi: '   {pn} <tên hoặc liên kết>: Cung cấp tên hoặc liên kết video'
                }
        },

        langs: {
                bn: {
                        noInput: "× হেই সুইটি, ভিডিওর নাম বা লিঙ্ক তো দাও! 📺✨",
                        noResult: "× দুঃখিত বেবি, কোনো রেজাল্ট পাওয়া যায়নি। 🥺",
                        success: "✨ এখানে আপনার ভিডিওটি তৈরি করা হয়েছে। আপনি এটি এখনই দেখতে পারেন। 🎬\n\n📝 𝗧𝗶𝘁𝗹𝗲: ❮ %1 ❯\n👤 𝗢𝘄𝗻𝗲𝗿: Riad 🌸",
                        error: "× সমস্যা হয়েছে: %1। প্রয়োজনে Contact Riyad! 💌"
                },
                en: {
                        noInput: "× Sweetheart, please provide a video name or link! 📺✨",
                        noResult: "× No results found. Let's try another name! 🥺",
                        success: "✨ Here is your video, it has been created. You can watch it now. 🎬\n\n📝 𝗧𝗶𝘁𝗹𝗲: ❮ %1 ❯\n👤 𝗢𝘄𝗻𝗲𝗿: Riad 🌸",
                        error: "× API error: %1. Contact Riyad for help! 💌"
                },
                vi: {
                        noInput: "× Cưng ơi, vui lòng cung cấp tên hoặc liên kết video! 📺✨",
                        noResult: "× Không tìm thấy kết quả phù hợp. 🥺",
                        success: "✨ Video của bạn đã được tạo thành công, bạn có thể xem ngay bây giờ. 🎬\n\n📝 𝐓𝐢ê𝐮 đề: ❮ %1 ❯\n👤 𝐍𝐠ườ𝐢 sở 𝐡ữ𝐮: Riad 🌸",
                        error: "× Lỗi: %1. Liên hệ Riyad để hỗ trợ! 💌"
                }
        },

        onStart: async function ({ api, event, args, message, getLang }) {
                const authorName = String.fromCharCode(82, 105, 121, 97, 100); // "Riyad"
                if (this.config.author !== authorName) {
                        return api.sendMessage("You are not authorized to change the author name.", event.threadID, event.messageID);
                }

                if (!args[0]) return message.reply(getLang("noInput"));

                try {
                        // Quick feedback reaction to feel fast
                        api.setMessageReaction("🐤", event.messageID, () => {}, true);
                        
                        const apiUrl = await baseApiUrl();
                        const checkurl = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?\sv=|watch\?.+&v=|shorts\/))((\w|-){11})(?:\S+)?$/;
                        let videoID;

                        if (checkurl.test(args[0])) {
                                videoID = args[0].match(checkurl)[1];
                        } else {
                                const keyWord = args.join(" ");
                                const searchRes = await axios.get(`${apiUrl}/api/video/search?songName=${encodeURIComponent(keyWord)}`, { timeout: 10000 });
                                if (!searchRes.data || searchRes.data.length === 0) {
                                        api.setMessageReaction("🥹", event.messageID, () => {}, true);
                                        return message.reply(getLang("noResult"));
                                }
                                videoID = searchRes.data[0].id;
                        }

                        const cacheDir = path.join(__dirname, "cache");
                        if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);
                        const filePath = path.join(cacheDir, `video_${videoID}.mp4`);

                        const res = await axios.get(`${apiUrl}/api/video/download?link=${videoID}&format=mp4`, { timeout: 12000 });
                        const { title, downloadLink } = res.data;

                        const videoBuffer = (await axios.get(downloadLink, { responseType: "arraybuffer", timeout: 20000 })).data;
                        fs.writeFileSync(filePath, Buffer.from(videoBuffer));

                        return message.reply({
                                body: getLang("success", title),
                                attachment: fs.createReadStream(filePath)
                        }, () => {
                                api.setMessageReaction("🪽", event.messageID, () => {}, true);
                                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                        });

                } catch (err) {
                        console.error("Video Download Error:", err);
                        return api.sendMessage(`Failed to process the video download: ${err.message || err}`, event.threadID);
                }
        }
};