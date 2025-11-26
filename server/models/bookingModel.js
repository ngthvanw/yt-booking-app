const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,   // ✔ sửa lỗi dấu '>'
        ref: "Room",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    }
}, 
{
    timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);
