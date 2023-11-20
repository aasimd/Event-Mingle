/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	events: [],
	selectedEvent: {},
	status: "idle",
	error: null
};

export const fetchEvents = createAsyncThunk(`events/fetchEvents`, async () => {
	const response = await axios.get(
		`https://event-volunteer-manager.aasimd.repl.co/events`
	);
	console.log(response.data);
	return response.data.data;
});

export const fetchOneEvent = createAsyncThunk(
	`events/fetchOneEvent`,
	async ({ eventId }) => {
		const response = await axios.get(
			`https://event-volunteer-manager.aasimd.repl.co/events/${eventId}`
		);
		console.log(response.data);
		return response.data.data;
	}
);

const eventsSlice = createSlice({
	name: "events",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchEvents.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchEvents.fulfilled]: (state, action) => {
			state.status = "success";
			state.events = action.payload;
		},
		[fetchEvents.rejected]: (state, action) => {
			state.status = "error";
			console.error(action.error);
			state.error = action.error.message;
		},
		[fetchOneEvent.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchOneEvent.fulfilled]: (state, action) => {
			state.status = "success";
			state.selectedEvent = action.payload;
		},
		[fetchOneEvent.rejected]: (state, action) => {
			state.status = "error";
			console.error(action.error);
			state.error = action.error.message;
		}
	}
});

export default eventsSlice;
