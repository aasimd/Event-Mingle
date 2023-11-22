/** @format */

import React, { useState } from "react";
import "./VolunteerForm.css";
import { useDispatch } from "react-redux";

const VolunteerForm = ({ type, volunteer, submitFunction, setShow }) => {
	const dispatch = useDispatch();
	const req = type === "add" ? true : false;
	const [newVolunteer, setNewVolunteer] = useState({
		name: volunteer.name,
		gender: volunteer.gender,
		age: volunteer.age,
		contactNumber: volunteer.contactNumber,
		availability: volunteer.availability,
		occupation: volunteer.occupation,
		skills: volunteer.skills,
		areasOfInterest: volunteer.areasOfInterest,
		eventsHistory: volunteer.eventsHistory
	});
	const [newSkill, setNewSkill] = useState("");
	const skillDeleteHandler = (deleteIndex, skills) => {
		let filteredSkills = skills.filter((s, i) => i !== deleteIndex);
		setNewVolunteer((p) => ({ ...p, skills: filteredSkills }));
	};
	const [newInterest, setNewInterest] = useState("");
	const interestDeleteHandler = (deleteIndex, interests) => {
		let filteredInterests = interests.filter((s, i) => i !== deleteIndex);
		setNewVolunteer((p) => ({ ...p, areasOfInterest: filteredInterests }));
	};
	const [newEvent, setNewEvent] = useState("");
	const eventDeleteHandler = (deleteIndex, events) => {
		let filteredEvents = events.filter((s, i) => i !== deleteIndex);
		setNewVolunteer((p) => ({ ...p, eventsHistory: filteredEvents }));
	};
	return (
		<div className="border-1">
			<h2>{type === "add" ? "Add New " : "Edit "}Volunteer</h2>
			<div>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						type === "add"
							? submitFunction(newVolunteer, dispatch)
							: submitFunction(newVolunteer, volunteer._id, dispatch);
						setShow(false);
					}}
				>
					<div>
						<label htmlFor="volunteer-name">
							Name:{" "}
							<input
								required={req}
								type="text"
								value={newVolunteer.name}
								onChange={(event) =>
									setNewVolunteer((p) => ({ ...p, name: event.target.value }))
								}
							/>
						</label>
					</div>
					<div>
						<label htmlFor="volunteer-gender">
							Gender:{" "}
							<select
								defaultValue={"Male"}
								onChange={(event) =>
									setNewVolunteer((p) => ({ ...p, gender: event.target.value }))
								}
							>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
						</label>
					</div>
					<div>
						<label htmlFor="volunteer-age">
							Age:{" "}
							<input
								min={10}
								max={80}
								required={req}
								type="number"
								value={newVolunteer.age}
								onChange={(event) =>
									setNewVolunteer((p) => ({ ...p, age: event.target.value }))
								}
							/>
						</label>
					</div>
					<div>
						<label htmlFor="volunteer-contactNumber">
							Contact Number:{" "}
							<input
								maxLength={10}
								required={req}
								type="number"
								value={newVolunteer.contactNumber}
								onChange={(event) =>
									setNewVolunteer((p) => ({
										...p,
										contactNumber: event.target.value
									}))
								}
							/>
						</label>
					</div>
					<div>
						<label htmlFor="volunteer-availability">
							Availability:{" "}
							<select
								defaultValue={true}
								onChange={(event) =>
									setNewVolunteer((p) => ({
										...p,
										availability: event.target.value
									}))
								}
								name="volunteer-availability"
								id="volunteer-availability"
							>
								<option value={true}>Yes</option>
								<option value={false}>No</option>
							</select>
						</label>
					</div>
					<div>
						<label htmlFor="volunteer-occupation">
							Occupation:{" "}
							<select
								defaultValue={"student"}
								onChange={(event) =>
									setNewVolunteer((p) => ({
										...p,
										occupation: event.target.value
									}))
								}
								name="volunteer-occupation"
								id="volunteer-occupation"
							>
								{[
									"student",
									"housewife",
									"employed",
									"retired",
									"unemployed",
									"other"
								].map((o) => (
									<option key={o} value={o}>
										{o}
									</option>
								))}
							</select>
						</label>
					</div>
					<div className="border-1">
						<label htmlFor="volunteer-skills">
							Skills:{" "}
							{newVolunteer.skills.length > 0 ? (
								newVolunteer.skills.map((s, index) => (
									<li key={index}>
										{s}{" "}
										<button
											title="Delete Skill"
											className="delete-button-1"
											onClick={(event) => {
												event.preventDefault();
												skillDeleteHandler(index, newVolunteer.skills);
											}}
										>
											X
										</button>
									</li>
								))
							) : (
								<b>No Skills Added </b>
							)}
							<br />
							{newVolunteer.skills.length < 3 ? (
								<>
									<input
										placeholder="New Skill"
										type="text"
										value={newSkill}
										onChange={(event) => setNewSkill(event.target.value)}
									/>
									<button
										onClick={(event) => {
											event.preventDefault();
											setNewVolunteer((p) => ({
												...p,
												skills: [...p.skills, newSkill]
											}));
										}}
									>
										Add
									</button>
								</>
							) : (
								<b>Skills Limit Reached</b>
							)}
						</label>
					</div>
					<div className="border-1">
						<label htmlFor="volunteer-areasOfInterest">
							Areas Of Interest:{" "}
							{newVolunteer.areasOfInterest.length > 0 ? (
								newVolunteer.areasOfInterest.map((s, index) => (
									<li key={index}>
										{s}{" "}
										<button
											title="Delete Interest"
											className="delete-button-1"
											onClick={(event) => {
												event.preventDefault();
												interestDeleteHandler(
													index,
													newVolunteer.areasOfInterest
												);
											}}
										>
											X
										</button>
									</li>
								))
							) : (
								<b>No Interests Added </b>
							)}
							<br />
							{newVolunteer.areasOfInterest.length < 3 ? (
								<>
									<input
										placeholder="New Interest"
										type="text"
										value={newInterest}
										onChange={(event) => setNewInterest(event.target.value)}
									/>
									<button
										onClick={(event) => {
											event.preventDefault();
											setNewVolunteer((p) => ({
												...p,
												areasOfInterest: [...p.areasOfInterest, newInterest]
											}));
											setNewInterest("");
										}}
									>
										Add
									</button>
								</>
							) : (
								<b>Skills Limit Reached</b>
							)}
						</label>
					</div>
					<div className="border-1">
						<label htmlFor="volunteer-eventsHistory">
							Events History:{" "}
							{newVolunteer.eventsHistory.length > 0 ? (
								newVolunteer.eventsHistory.map((s, index) => (
									<li key={index}>
										{s}{" "}
										<button
											title="Delete Event"
											className="delete-button-1"
											onClick={(event) => {
												event.preventDefault();
												eventDeleteHandler(index, newVolunteer.eventsHistory);
											}}
										>
											X
										</button>
									</li>
								))
							) : (
								<b>No Events Added </b>
							)}
							<br />
							{newVolunteer.eventsHistory.length < 3 ? (
								<>
									<input
										placeholder="New Event"
										type="text"
										value={newEvent}
										onChange={(event) => setNewEvent(event.target.value)}
									/>
									<button
										onClick={(event) => {
											event.preventDefault();
											setNewVolunteer((p) => ({
												...p,
												eventsHistory: [...p.eventsHistory, newEvent]
											}));
											setNewEvent("");
										}}
									>
										Add
									</button>
								</>
							) : (
								<b>Skills Limit Reached</b>
							)}
						</label>
					</div>
					<div>
						<div>
							<input
								title="Submit form"
								type="submit"
								value={req ? "Add Volunteer" : "Edit Volunteer"}
							/>
						</div>
						<div>
							<input
								type="reset"
								value={"Discard"}
								onClick={() => setShow(false)}
								title="Discard form"
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default VolunteerForm;
