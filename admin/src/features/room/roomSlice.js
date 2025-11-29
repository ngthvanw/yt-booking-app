import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// ======================= CREATE ROOM =======================
export const createRoom = createAsyncThunk(
  "room/create",
  async (roomData, thunkApi) => {
    try {
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomData),
      });

      const data = await res.json();
      if (!res.ok) return thunkApi.rejectWithValue(data);

      return data; // trả về room mới
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// ======================= GET ALL ROOMS =======================
export const getRooms = createAsyncThunk(
  "room/getAll",
  async (_, thunkApi) => {
    try {
      const res = await fetch("/api/rooms");
      const data = await res.json();

      if (!res.ok) return thunkApi.rejectWithValue(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// ======================= UPDATE ROOM =======================
export const updateRoom = createAsyncThunk(
  "room/update",
  async (roomData, thunkApi) => {
    try {
      const { roomId, ...rest } = roomData;

      const res = await fetch(`/api/rooms/${roomId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest),
      });

      const data = await res.json();
      if (!res.ok) return thunkApi.rejectWithValue(data);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// ======================= DELETE ROOM =======================
export const deleteRoom = createAsyncThunk(
  "room/delete",
  async (roomId, thunkApi) => {
    try {
      const res = await fetch(`/api/rooms/${roomId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) return thunkApi.rejectWithValue(data);

      return data; // { id: ... }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// ======================= SLICE =======================
export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== CREATE =====
      .addCase(createRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms.push(action.payload); // thêm phòng mới
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ===== GET ALL =====
      .addCase(getRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = action.payload;
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ===== UPDATE =====
      .addCase(updateRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const index = state.rooms.findIndex(
          (room) => room._id === action.payload._id
        );
        if (index !== -1) state.rooms[index] = action.payload;
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ===== DELETE =====
      .addCase(deleteRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.rooms = state.rooms.filter(
          (room) => room._id !== action.payload.id
        );
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = roomSlice.actions;
export default roomSlice.reducer;
