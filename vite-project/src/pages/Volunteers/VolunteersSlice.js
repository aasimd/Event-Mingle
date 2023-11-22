/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
	volunteers: [],
	status: "idle",
	error: null
};

export const fetchVolunteers = createAsyncThunk(
	`volunteers/fetchVolunteers`,
	async () => {
		const response = await axios.get(
			`https://event-volunteer-manager.aasimd.repl.co/volunteers`
		);
		console.log(response.data);
		return response.data.data;
	}
);

export const addVolunteer = createAsyncThunk(
	`volunteers/addVolunteer`,
	async (volunteer) => {
		const response = await axios.post(
			`https://event-volunteer-manager.aasimd.repl.co/volunteers`,
			volunteer
		);
		console.log(response.data);
		return response.data.data;
	}
);

export const deleteVolunteer = createAsyncThunk(
	`volunteers/deleteVolunteer`,
	async ({ volunteerId }) => {
		const response = await axios.delete(
			`https://event-volunteer-manager.aasimd.repl.co/volunteers/${volunteerId}`
		);
		console.log(response.data);
		return response.data.data;
	}
);

export const editVolunteer = createAsyncThunk(
	`volunteers/editVolunteer`,
	async ({ volunteer, volunteerId }) => {
		const response = await axios.put(
			`https://event-volunteer-manager.aasimd.repl.co/volunteers/${volunteerId}`,
			volunteer
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
		},
		[addVolunteer.pending]: (state, action) => {
			state.status = "loading";
		},
		[addVolunteer.fulfilled]: (state, action) => {
			state.status = "success";
			state.volunteers.push(action.payload);
		},
		[addVolunteer.rejected]: (state, action) => {
			state.status = "error";
			console.error(action.error);
			state.error = action.error.message;
		},
		[deleteVolunteer.pending]: (state, action) => {
			state.status = "loading";
		},
		[deleteVolunteer.fulfilled]: (state, action) => {
			state.status = "success";
			state.volunteers = state.volunteers.filter(
				(v) => v._id !== action.payload._id
			);
		},
		[deleteVolunteer.rejected]: (state, action) => {
			state.status = "error";
			console.error(action.error);
			state.error = action.error.message;
		},
		[editVolunteer.pending]: (state, action) => {
			state.status = "loading";
		},
		[editVolunteer.fulfilled]: (state, action) => {
			state.status = "success";
			const index = state.volunteers.findIndex(
				(v) => v._id === action.payload._id
			);

			state.volunteers[index] = action.payload;
		},
		[editVolunteer.rejected]: (state, action) => {
			state.status = "error";
			console.error(action.error);
			state.error = action.error.message;
		}
	}
});

export default volunteersSlice;
