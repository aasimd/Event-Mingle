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

export const addEvent = createAsyncThunk(
	`events/addEvent`,
	async ({ event }) => {
		const response = await axios.post(
			`https://event-volunteer-manager.aasimd.repl.co/events`,
			event
		);
		console.log(response.data);
		return response.data.data;
	}
);

export const deleteEvent = createAsyncThunk(
	`events/deleteEvent`,
	async ({ eventId }) => {
		const response = await axios.delete(
			`https://event-volunteer-manager.aasimd.repl.co/events/${eventId}`
		);
		console.log(response.data);
		return response.data.data;
	}
);

export const editEvent = createAsyncThunk(
	`events/editEvent`,
	async ({ event, id }) => {
		const response = await axios.put(
			`https://event-volunteer-manager.aasimd.repl.co/events/${id}`,
			event
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
		},
		[addEvent.pending]: (state, action) => {
			state.status = "loading";
		},
		[addEvent.fulfilled]: (state, action) => {
			state.status = "success";
			state.events.push(action.payload);
		},
		[addEvent.rejected]: (state, action) => {
			state.status = "error";
			console.error(action.error);
			state.error = action.error.message;
		},
		[deleteEvent.pending]: (state, action) => {
			state.status = "loading";
		},
		[deleteEvent.fulfilled]: (state, action) => {
			state.status = "success";
			state.events = state.events.filter((e) => e._id !== action.payload._id);
		},
		[deleteEvent.rejected]: (state, action) => {
			state.status = "error";
			console.error(action.error);
			state.error = action.error.message;
		},
		[editEvent.pending]: (state, action) => {
			state.status = "loading";
		},
		[editEvent.fulfilled]: (state, action) => {
			state.status = "success";
			const index = state.events.findIndex((e) => e._id === action.payload._id);
			state.events[index] = action.payload;
		},
		[editEvent.rejected]: (state, action) => {
			state.status = "error";
			console.error(action.error);
			state.error = action.error.message;
		}
	}
});

export default eventsSlice;
