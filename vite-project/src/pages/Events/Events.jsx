/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "./EventsSlice";
import EventsList from "../../components/EventsList/EventsList";
import EventForm from "../../components/EventForm/EventForm";
import { addEventHandler } from "../../utils";

const event = {
	name: "",
	description: "",
	date: "",
	time: "",
	location: "",
	volunteers: [{ volunteer: "655dd88eb61e88b25cd448cf" }]
};

const Events = () => {
	const dispatch = useDispatch();
	const { events, status, error } = useSelector((s) => s.events);
	const [showAdd, setShowAdd] = useState(false);

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
				{showAdd ? (
					<EventForm
						event={event}
						setShow={setShowAdd}
						submitFunction={addEventHandler}
						type="add"
					/>
				) : (
					<button onClick={() => setShowAdd(true)}>Add Event</button>
				)}
				<EventsList events={events} />
			</div>
		</div>
	);
};

export default Events;
