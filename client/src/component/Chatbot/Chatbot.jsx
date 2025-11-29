// client/src/components/Chatbot/Chatbot.jsx

import { useState, useEffect, useRef } from "react";
import "./chatbot.scss";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Xin chào! Tôi có thể hỗ trợ gì cho bạn? 😊" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const msgEndRef = useRef(null);

  const scrollToBottom = () => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input;

    // hiển thị tin nhắn user
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setInput("");

    try {
      setTyping(true);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();
      setTyping(false);

      const extraMsgs = [];

      // Nếu backend trả về rooms => tạo card cho những phòng tên xuất hiện trong reply
      if (data.rooms && Array.isArray(data.rooms)) {
        const matched = data.rooms.filter((room) =>
          data.reply.includes(room.name)
        );

        matched.forEach((room) => {
          extraMsgs.push({
            from: "bot",
            roomCard: {
              _id: room._id,
              name: room.name,
              desc: room.desc,
              price: room.price, // price đang là string => hiển thị thẳng
              img: room.img?.[0] || "",
            },
          });
        });
      }

      // thêm card phòng (nếu có) + câu trả lời bot
      setMessages((prev) => [
        ...prev,
        ...extraMsgs,
        { from: "bot", text: data.reply },
      ]);
    } catch (err) {
      console.error(err);
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Xin lỗi, hiện tại hệ thống đang gặp lỗi. Bạn thử lại sau nhé 🥲" },
      ]);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // Quick actions (nút gợi ý nhanh)
  const quickActions = [
    "Phòng giá rẻ nhất",
    "Phòng dưới 1 triệu",
    "Phòng view đẹp",
    "Xem tất cả phòng",
  ];

  return (
    <div className="chatbot-container">
      {/* Nút chat tròn */}
      {!open && (
        <button className="chat-btn" onClick={() => setOpen(true)}>
          💬
        </button>
      )}

      {/* Khung chat */}
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-left">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712100.png"
                className="bot-avatar"
                alt=""
              />
              <span>Trợ lý khách sạn</span>
            </div>
            <span className="close-icon" onClick={() => setOpen(false)}>
              ×
            </span>
          </div>

          <div className="chat-body">
            {/* Quick actions */}
            <div className="quick-actions">
              {quickActions.map((q, i) => (
                <button key={i} onClick={() => setInput(q)}>
                  {q}
                </button>
              ))}
            </div>

            {/* Messages */}
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.from}`}>
                {msg.text}

                {/* Ảnh phòng (nếu có) */}
                {msg.img && (
                  <img src={msg.img} className="msg-img" alt="room" />
                )}

                {/* Card phòng gợi ý */}
                {msg.roomCard && (
                  <div className="room-card">
                    {msg.roomCard.img && (
                      <img src={msg.roomCard.img} alt={msg.roomCard.name} />
                    )}
                    <div className="room-info">
                      <h4>{msg.roomCard.name}</h4>
                      <p>{msg.roomCard.desc}</p>
                      <strong>{msg.roomCard.price} / đêm</strong>

                      <a
                        className="book-btn-mini"
                        href={`/bookings/${msg.roomCard._id}`}
                      >
                        Đặt phòng
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing animation */}
            {typing && (
              <div className="msg bot typing">
                <div className="dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={msgEndRef}></div>
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Nhập tin nhắn..."
            />
            <button onClick={sendMessage}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
