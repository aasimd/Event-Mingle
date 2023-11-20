/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
	volunteers: [],
	status: "idle",
	error: null
};

export const fetchVolunteers = createAsyncThunk(
	`events/fetchVolunteers`,
	async () => {
		const response = await axios.get(
			`https://event-volunteer-manager.aasimd.repl.co/volunteers`
		);
		console.log(response.data);
		return response.data.data;
	}
);

const volunteersSlice = createSlice({
	name: "volunteers",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchVolunteers.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchVolunteers.fulfilled]: (state, action) => {
			state.status = "success";
			state.volunteers = action.payload;
		},
		[fetchVolunteers.rejected]: (state, action) => {
			state.status = "error";
			console.error(action.error);
			state.error = action.error.message;
		}
	}
});

export default volunteersSlice;
