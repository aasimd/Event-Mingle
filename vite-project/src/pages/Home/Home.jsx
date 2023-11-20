/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "../Events/EventsSlice";
import { fetchVolunteers } from "../Volunteers/VolunteersSlice";
import "./Home.css";
const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		status: eventStatus,
		events,
		error: eventError
	} = useSelector((s) => s.events);
	const {
		status: volunteerStatus,
		volunteers,
		error: volunteerError
	} = useSelector((s) => s.volunteers);
	useEffect(() => {
		if (eventStatus === "idle") {
			dispatch(fetchEvents());
		}
		if (volunteerStatus === "idle") {
			dispatch(fetchVolunteers());
		}
	}, [dispatch]);
	if (volunteerStatus === "loading" || eventStatus === "loading")
		return <h1>Loading...</h1>;
	if (volunteerStatus === "error" || eventStatus === "error")
		return <p>{volunteerError ?? eventError}</p>;
	return (
		<div>
			<h1>Home</h1>
			<div>
				<div className="bright-section">
					<h3>
						Total Volunteers: <b>{volunteers.length}</b>
					</h3>
					<button onClick={() => navigate("/volunteers")}>
						{"Check Volunteers >"}
					</button>
				</div>
				<div className="bright-section">
					<h3>
						Total Events: <b>{events.length}</b>
					</h3>
					<button onClick={() => navigate("/events")}>
						{"Check Events >"}
					</button>
				</div>
			</div>
			<div className="bright-section">
				<b>About</b>
				<br />
				The Volunteer Management Application is designed to simplify the process
				of recruiting, tracking, and engaging volunteers for various events and
				initiatives. It provides tools for organizers to efficiently manage
				volunteer records, create events, and access event and volunteer
				statistics.
			</div>
		</div>
	);
};

export default Home;
