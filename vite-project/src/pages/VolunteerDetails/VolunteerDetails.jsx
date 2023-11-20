/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const VolunteerDetails = () => {
	const navigate = useNavigate();
	const { volunteerId } = useParams();
	const { volunteers, status, error } = useSelector((s) => s.volunteers);
	const volunteer = volunteers.find((v) => v._id === volunteerId);
	const {
		name,
		skills,
		age,
		areasOfInterest,
		availability,
		contactNumber,
		eventsHistory,
		gender,
		occupation
	} = volunteer;
	return (
		<div>
			<div>
				<button onClick={() => navigate(-1)}>{"< Back"}</button>
			</div>
			<h1>Volunteer Details</h1>
			<div>
				<h2>{name}</h2>
				<div>
					<p>
						Gender: <b>{gender}</b> <br />
						Age: <b>{age}</b>
						<br />
						Contact Number: <b>{contactNumber}</b>
						<br />
						Availability: <b>{availability ? "Available" : "Unavailable"}</b>
						<br />
						Occupation: <b>{occupation}</b>
						<br />
						Skills: <b>{skills.map((s) => s).join(", ")}</b>
						<br />
						Areas of Interest: <b>{areasOfInterest.map((a) => a).join(", ")}</b>
						<br />
						Events History: <b>{eventsHistory.map((e) => e).join(", ")}</b>
					</p>
				</div>
				<div>
					<div>
						<button>Edit</button>
					</div>
					<div>
						<button>Delete</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VolunteerDetails;
