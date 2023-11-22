/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVolunteers } from "./VolunteersSlice";
import VolunteersList from "../../components/VolunteersList/VolunteersList";
import VolunteerForm from "../../components/VolunteerForm/VolunteerForm";
import { addVolunteerHandler } from "../../utils";
const volunteer = {
	name: "",
	gender: "Male",
	age: 10,
	contactNumber: "",
	availability: true,
	occupation: "student",
	skills: [],
	areasOfInterest: [],
	eventsHistory: []
};

const Volunteers = () => {
	const dispatch = useDispatch();
	const { status, volunteers, error } = useSelector((s) => s.volunteers);

	const [showAdd, setShowAdd] = useState(false);

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchVolunteers());
		}
	}, [status, dispatch]);
	if (status === "loading") return <h1>Loading...</h1>;
	if (status === "error") return <p>{error}</p>;

	return (
		<div>
			<h1>Volunteers</h1>
			<div>
				{showAdd ? (
					<VolunteerForm
						type={"add"}
						setShow={setShowAdd}
						volunteer={volunteer}
						submitFunction={addVolunteerHandler}
					/>
				) : (
					<button onClick={() => setShowAdd(true)}>Add Volunteer</button>
				)}
			</div>
			<div>
				<VolunteersList volunteers={volunteers} />
			</div>
		</div>
	);
};

export default Volunteers;
