import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

    // Hiển thị tin nhắn user
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

      // Nếu backend trả về rooms
      if (data.rooms && Array.isArray(data.rooms)) {
        const matched = data.rooms.filter(
          (room) => room && room._id && data.reply?.includes(room.name)
        );

        matched.forEach((room) => {
          extraMsgs.push({
            from: "bot",
            roomCard: {
              _id: room._id,
              name: room.name,
              desc: room.desc,
              price: room.price,
              img: room.img?.[0] || "",
            },
          });
        });
      }

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
        {
          from: "bot",
          text: "Xin lỗi, hệ thống đang gặp lỗi. Bạn thử lại sau nhé 🥲",
        },
      ]);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // Gợi ý nhanh
  const quickActions = [
    "Phòng giá rẻ nhất",
    "Phòng dưới 1 triệu",
    "Phòng view đẹp",
    "Xem tất cả phòng",
  ];

  return (
    <div className="chatbot-container">
      {/* Nút mở chat */}
      {!open && (
        <button className="chat-btn" onClick={() => setOpen(true)}>
          💬
        </button>
      )}

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-left">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712100.png"
                className="bot-avatar"
                alt="bot"
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

                {/* Card phòng gợi ý */}
                {msg.roomCard && msg.roomCard._id && (
                  <div className="room-card">
                    {msg.roomCard.img && (
                      <img
                        src={msg.roomCard.img}
                        alt={msg.roomCard.name}
                      />
                    )}
                    <div className="room-info">
                      <h4>{msg.roomCard.name}</h4>
                      <p>{msg.roomCard.desc}</p>
                      <strong>{msg.roomCard.price} / đêm</strong>

                      {/* ✅ FIX CHUẨN: Link + state */}
                      <Link
                        to="/bookings"
                        state={{ roomId: msg.roomCard._id }}
                        className="book-btn-mini"
                        onClick={() => setOpen(false)}
                      >
                        Đặt phòng
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing */}
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
