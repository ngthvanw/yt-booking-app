// server/controllers/chat.controller.js

const OpenAI = require("openai");
const Room = require("../models/roomModel");

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

exports.askBot = async (req, res) => {
  try {
    const { message } = req.body;

    // Lấy tất cả phòng trong DB
    const rooms = await Room.find();

    // Chuẩn bị dữ liệu phòng cho bot hiểu
    const roomData = rooms
      .map(
        (r) =>
          `• ${r.name} – Giá: ${r.price} – Mô tả: ${r.desc}`
      )
      .join("\n");

    // Gọi OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Bạn là trợ lý khách sạn, trả lời tiếng Việt lịch sự, thân thiện, súc tích và dựa trên danh sách phòng sau:\n\n" +
            roomData +
            "\n\nKhi khách hỏi: giá rẻ, dưới 1 triệu, view đẹp, cao cấp... hãy gợi ý 1–3 phòng phù hợp trong danh sách, kèm theo tên phòng và giá.",
        },
        { role: "user", content: message },
      ],
    });

    const reply = response.choices[0].message.content;

    // TRẢ VỀ: câu trả lời + danh sách phòng
    return res.json({
      reply,
      rooms, // frontend sẽ tự chọn phòng phù hợp để hiện card
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Chatbot error" });
  }
};
