import "./momo-processing.scss";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";

const MoMoProcessing = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [seconds, setSeconds] = useState(3);

  /* ================= SAFE FALLBACK ================= */
  const bookingId = state?.bookingId;
  const bookingCode = state?.bookingCode || "";
  const roomName = state?.roomName || "";
  const roomPrice = Number(state?.roomPrice || 0);
  const checkInDate = state?.checkInDate;
  const checkOutDate = state?.checkOutDate;

  /* ================= REDIRECT NẾU KHÔNG CÓ DATA ================= */
  useEffect(() => {
    if (!bookingId) {
      navigate("/rooms");
    }
  }, [bookingId, navigate]);

  /* ================= TÍNH SỐ ĐÊM ================= */
  const nights = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 1;

    const inDate = new Date(checkInDate);
    let outDate = new Date(checkOutDate);

    if (outDate <= inDate) {
      outDate = new Date(inDate);
      outDate.setDate(inDate.getDate() + 1);
    }

    return Math.ceil(
      (outDate - inDate) / (1000 * 60 * 60 * 24)
    );
  }, [checkInDate, checkOutDate]);

  /* ================= TỔNG TIỀN ================= */
  const totalAmount = useMemo(() => {
    return roomPrice * nights;
  }, [roomPrice, nights]);

  /* ================= MÃ GIAO DỊCH MOMO ================= */
  const transactionId = useMemo(
    () => `MOMO-${Date.now()}`,
    []
  );

  /* ================= QR VALUE ================= */
  const qrValue = useMemo(() => {
    return `momo://pay?amount=${totalAmount}&booking=${bookingCode}&trans=${transactionId}`;
  }, [totalAmount, bookingCode, transactionId]);

  /* ================= COUNTDOWN ================= */
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* ================= AUTO CONFIRM MOMO ================= */
  useEffect(() => {
    if (seconds > 0 || !bookingId) return;

    const confirm = async () => {
      await axios.patch(
        `http://localhost:5000/api/bookings/${bookingId}/confirm-momo`,
        { transactionId }
      );

      navigate("/payment-success", {
        state: {
          ...state,
          transactionId,
        },
      });
    };

    confirm().catch((e) => {
      console.error(e);
      alert("Xác nhận MoMo giả thất bại");
    });
  }, [seconds, bookingId, transactionId, navigate, state]);

  /* ================= UI ================= */
  return (
    <div className="momo-page">
      <div className="momo-card">
        <div className="momo-header">
          <div className="brand">
            <div className="logo">M</div>
            <div>
              <div className="brand-name">MoMo</div>
              <div className="brand-sub">Thanh toán an toàn</div>
            </div>
          </div>
          <div className="status">Đang xử lý...</div>
        </div>

        <div className="momo-body">
          <div className="left">
            <h2>Quét QR để thanh toán</h2>

            <div className="qr-box">
              <QRCodeCanvas value={qrValue} size={210} />
            </div>

            <div className="hint">
              Mã giao dịch: <b>{transactionId}</b>
            </div>

            <div className="countdown">
              Tự động xác nhận sau <b>{seconds}</b> giây...
            </div>
          </div>

          <div className="right">
            <h3>Thông tin đơn</h3>
            <ul>
              <li>
                <span>Mã đặt phòng</span>
                <b>{bookingCode}</b>
              </li>
              <li>
                <span>Phòng</span>
                <b>{roomName}</b>
              </li>
              <li>
                <span>Số đêm</span>
                <b>{nights}</b>
              </li>
              <li>
                <span>Tổng tiền</span>
                <b>{totalAmount.toLocaleString("vi-VN")} ₫</b>
              </li>
            </ul>

            <div className="note">
              * Đây là luồng MoMo mô phỏng để demo đồ án.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoMoProcessing;
