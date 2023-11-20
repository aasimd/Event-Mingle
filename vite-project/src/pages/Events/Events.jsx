/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "./EventsSlice";
import EventsList from "../../components/EventsList/EventsList";

const Events = () => {
	const dispatch = useDispatch();
	const { events, status, error } = useSelector((s) => s.events);
	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchEvents());
		}
	}, []);
	if (status === "loading") return <h1>Loading...</h1>;
	if (status === "error") return <p>{error}</p>;
	return (
		<div>
			<h1>Events</h1>
			<div>
				<EventsList events={events} />
			</div>
		</div>
	);
};

export default Events;
