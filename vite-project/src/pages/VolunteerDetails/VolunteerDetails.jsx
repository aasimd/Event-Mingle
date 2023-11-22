/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteVolunteer } from "../../pages/Volunteers/VolunteersSlice";
import VolunteerForm from "../../components/VolunteerForm/VolunteerForm";
import { editVolunteerHandler } from "../../utils";
const VolunteerDetails = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { volunteerId } = useParams();
	const { volunteers, status, error } = useSelector((s) => s.volunteers);
	const volunteer = volunteers.find((v) => v._id === volunteerId);
	const [showEdit, setShowEdit] = useState(false);
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
	if (status === "loading") return <h1>Loading...</h1>;
	if (status === "error") return <p>{error}</p>;

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
						Skills:{" "}
						{skills.length > 0 ? (
							<b>{skills.map((s) => s).join(", ")}</b>
						) : (
							"No Skills Added"
						)}
						<br />
						Areas of Interest:{" "}
						{areasOfInterest.length > 0 ? (
							<b>{areasOfInterest.map((a) => a).join(", ")}</b>
						) : (
							"No Interests Added"
						)}
						<br />
						Events History:{" "}
						{eventsHistory.length > 0 ? (
							<b>{eventsHistory.map((e) => e).join(", ")}</b>
						) : (
							"No Events Added"
						)}
					</p>
				</div>
				<div>
					{showEdit ? (
						<VolunteerForm
							volunteer={volunteer}
							type="edit"
							submitFunction={editVolunteerHandler}
							setShow={setShowEdit}
						/>
					) : (
						<div>
							<button onClick={() => setShowEdit(true)}>Edit</button>
						</div>
					)}
					<div
						onClick={() => {
							dispatch(deleteVolunteer({ volunteerId: volunteerId }));
							navigate(-1);
						}}
					>
						<button>Delete</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VolunteerDetails;
