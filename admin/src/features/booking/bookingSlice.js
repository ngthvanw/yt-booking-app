import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  booking: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// 👉 Tạo booking (client dùng)
export const createBooking = createAsyncThunk(
  "booking/create",
  async (bookingData, thunkApi) => {
    try {
      const res = await fetch(`/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      if (!res.ok) return thunkApi.rejectWithValue(data);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// 👉 Lấy danh sách booking (admin)
export const getBookings = createAsyncThunk(
  "booking/get",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;

      const res = await fetch("http://localhost:5000/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return thunkApi.rejectWithValue(data);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// 👉 Xoá booking
export const deleteBooking = createAsyncThunk(
  "booking/delete",
  async (id, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;

      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return thunkApi.rejectWithValue(data);

      return { id };
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

// 👉 Xác nhận booking
export const confirmBooking = createAsyncThunk(
  "booking/confirm",
  async (id, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;

      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirmed: true }),
      });

      const data = await res.json();
      if (!res.ok) return thunkApi.rejectWithValue(data);

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Bookings
      .addCase(getBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete Booking
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (item) => item._id !== action.payload.id
        );
      })

      // Confirm Booking
      .addCase(confirmBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      });
  },
});

export const { reset } = bookingSlice.actions;
export default bookingSlice.reducer;
