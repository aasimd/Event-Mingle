/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVolunteers } from "../../pages/Volunteers/VolunteersSlice";

const EventForm = ({ event, setShow, submitFunction, type }) => {
	const [newEvent, setNewEvent] = useState({
		...event
	});
	const todaysDate = new Date().toISOString().slice(0, 10);
	const [showVolunteersList, setShowVolunteersList] = useState(false);
	const {
		volunteers,
		error: volunteerError,
		status: volunteerStatus
	} = useSelector((s) => s.volunteers);
	const volunteerIds = newEvent.volunteers.map((v) => v.volunteer);
	const getVolunteers = (volunteers, event) => {
		const volunteerId = event.target.value;
		const isChecked = event.target.checked;
		isChecked
			? setNewEvent((p) => ({
					...p,
					volunteers: [...p.volunteers, { volunteer: volunteerId }]
			  }))
			: setNewEvent((p) => ({
					...p,
					volunteers: [...p.volunteers].filter(
						(v) => v.volunteer !== volunteerId
					)
			  }));
	};
	const dispatch = useDispatch();
	const req = type === "add";
	const formattedDate = newEvent.date.slice(0, 10);
	useEffect(() => {
		if (volunteerStatus === "idle") {
			dispatch(fetchVolunteers());
		}
	}, [dispatch, volunteerStatus]);
	if (volunteerStatus === "loading") return <h1>Loading...</h1>;
	if (volunteerStatus === "error") return <b>{error}</b>;
	return (
		<div className="border-1">
			<h2>{type === "add" ? "Add New " : "Edit "}Event</h2>
			<div>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						console.log(newEvent);
						type === "add"
							? submitFunction(newEvent, dispatch)
							: submitFunction(newEvent, newEvent._id, dispatch);
						setShow(false);
					}}
				>
					<div>
						<label htmlFor="event-name">
							Name:
							<input
								required={req}
								type="text"
								value={newEvent.name}
								onChange={(event) =>
									setNewEvent((p) => ({ ...p, name: event.target.value }))
								}
							/>
						</label>
					</div>
					<div>
						<label htmlFor="event-description">
							Description:
							<input
								required={req}
								type="text"
								value={newEvent.description}
								onChange={(event) =>
									setNewEvent((p) => ({
										...p,
										description: event.target.value
									}))
								}
							/>
						</label>
					</div>
					<div>
						<label htmlFor="event-date">
							Date:
							<input
								required={req}
								min={todaysDate}
								type="date"
								value={formattedDate ?? ""}
								onChange={(event) =>
									setNewEvent((p) => ({
										...p,
										date: event.target.value
									}))
								}
							/>
						</label>
					</div>
					<div>
						<label htmlFor="event-time">
							Time:
							<input
								required={req}
								placeholder="12:00 pm"
								type="text"
								value={newEvent.time}
								onChange={(event) =>
									setNewEvent((p) => ({
										...p,
										time: event.target.value
									}))
								}
							/>
						</label>
					</div>
					<div>
						<label htmlFor="event-location">
							Location:
							<input
								type="text"
								value={newEvent.location}
								onChange={(event) =>
									setNewEvent((p) => ({
										...p,
										location: event.target.value
									}))
								}
							/>
						</label>
					</div>
					<div>
						<label htmlFor="event-volunteers">
							Volunteers:{" "}
							<>
								{showVolunteersList ? (
									<div>
										{" "}
										<button
											onClick={(event) => {
												event.preventDefault();
												setShowVolunteersList(false);
											}}
										>
											Hide Volunteers
										</button>
										<p>Available Volunteers: </p>
										<ul>
											{volunteers.map((v) => (
												<li key={v._id}>
													<label htmlFor={v.name}>
														<input
															value={v._id}
															onChange={(event) =>
																getVolunteers(volunteers, event)
															}
															checked={
																volunteerIds.includes(v._id) ? true : false
															}
															type="checkbox"
														/>
														{v.name} (
														{v.availability ? "Available" : "Unavailable"})
													</label>
												</li>
											))}
										</ul>
									</div>
								) : (
									<button
										onClick={(event) => {
											event.preventDefault();
											setShowVolunteersList(true);
										}}
									>
										Edit Volunteers
									</button>
								)}
							</>
						</label>
					</div>
					<div>
						<div>
							<input
								type="submit"
								value={type === "add" ? "Add Event" : "Edit Event"}
							/>
						</div>
						<div>
							<input
								type="reset"
								value="Discard"
								onClick={() => setShow(false)}
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EventForm;
