/** @format */

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
