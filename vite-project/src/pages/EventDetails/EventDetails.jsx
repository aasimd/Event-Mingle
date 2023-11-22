/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteEvent, fetchOneEvent } from "../Events/EventsSlice";
import { fetchVolunteers } from "../Volunteers/VolunteersSlice";
import VolunteersListForEventDetailsPage from "../../components/VolunteersListForEventDetailsPage/VolunteersListForEventDetailsPage";
import EventForm from "../../components/EventForm/EventForm";
import { editEventHandler } from "../../utils";

const EventDate = ({ date }) => {
	return <b>{date.slice(0, 10)}</b>;
};

const EventDetails = () => {
	const [showEdit, setShowEdit] = useState(false);
	const { eventId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { status, error, events } = useSelector((s) => s.events);
	const { status: volunteersStatus } = useSelector((s) => s.volunteers);
	useEffect(() => {
		dispatch(fetchOneEvent({ eventId: eventId }));
	}, []);
	useEffect(() => {
		if (volunteersStatus === "idle") {
			dispatch(fetchVolunteers());
		}
	}, [status, dispatch]);

	if (volunteersStatus === "loading") return <h1>Loading...</h1>;
	if (status === "error") return <p>{error}</p>;
	const event = events.find((e) => e._id === eventId);
	const { volunteers: eventVolunteers } = event;
	return (
		<div>
			<div>
				<button onClick={() => navigate(-1)}>{"< Back"}</button>
			</div>
			<div>
				<h1>Event Details</h1>
				{showEdit && (
					<EventForm
						event={event}
						type={"edit"}
						setShow={setShowEdit}
						submitFunction={editEventHandler}
					/>
				)}
				<div>
					<h2>{event.name}</h2>
					<p>
						<b>{event.description}</b>
						<br />
						Date: <EventDate date={event.date} />
						<br />
						Time: <b>{event.time}</b>
						<br />
						Location: <b>{event.location}</b>
						<br />
						{volunteersStatus === "success" && (
							<VolunteersListForEventDetailsPage
								eventVolunteers={eventVolunteers}
							/>
						)}
					</p>
					<div>
						<div>
							<button onClick={() => setShowEdit(true)}>Edit</button>
						</div>
						<div>
							<button
								onClick={() => {
									navigate(-1);
									dispatch(deleteEvent({ eventId: event._id }));
								}}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventDetails;
