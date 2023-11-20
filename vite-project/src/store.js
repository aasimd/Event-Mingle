/** @format */

import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./pages/Events/EventsSlice";
import volunteersSlice from "./pages/Volunteers/VolunteersSlice";

export default configureStore({
	reducer: {
		events: eventsSlice.reducer,
		volunteers: volunteersSlice.reducer
	}
});
