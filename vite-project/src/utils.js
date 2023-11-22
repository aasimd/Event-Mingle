/** @format */

import { addEvent, editEvent } from "./pages/Events/EventsSlice";
import {
	addVolunteer,
	editVolunteer
} from "./pages/Volunteers/VolunteersSlice";

export const getActiveStyles = ({ isActive }) =>
	isActive ? { color: "red", fontWeight: 700 } : { fontWeight: 500 };

export const getEventVolunteersList = (eventVolunteers, volunteers) => {
	const eventVolunteersId = eventVolunteers.map((v) => v.volunteer);
	const eventVolunteersObjs = eventVolunteersId.map((v) => {
		const volunteerObj = volunteers.find((e) => v === e._id);
		return volunteerObj;
	});
	return eventVolunteersObjs;
};

export const addVolunteerHandler = (volunteer, dispatch) => {
	const newVolunteer = {
		name: volunteer.name,
		gender: volunteer.gender,
		age: Number(volunteer.age),
		contactNumber: Number(volunteer.contactNumber),
		availability: volunteer.availability,
		occupation: volunteer.occupation,
		skills: volunteer.skills,
		areasOfInterest: volunteer.areasOfInterest,
		eventsHistory: volunteer.eventsHistory
	};
	dispatch(addVolunteer(newVolunteer));
};

export const editVolunteerHandler = (volunteer, volunteerId, dispatch) => {
	const newVolunteer = {
		...volunteer,
		_id: volunteer._id,
		age: Number(volunteer.age),
		contactNumber: Number(volunteer.contactNumber)
	};
	dispatch(
		editVolunteer({ volunteer: newVolunteer, volunteerId: volunteerId })
	);
};

export const addEventHandler = (event, dispatch) => {
	const newEvent = {
		...event
	};
	dispatch(addEvent({ event: newEvent }));
};
export const editEventHandler = (event, eventId, dispatch) => {
	const newEvent = {
		...event,
		_id: event._id
	};
	dispatch(editEvent({ event: newEvent, id: eventId }));
};
