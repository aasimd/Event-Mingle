/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVolunteers } from "./VolunteersSlice";
import VolunteersList from "../../components/VolunteersList/VolunteersList";

const Volunteers = () => {
	const dispatch = useDispatch();
	const { status, volunteers, error } = useSelector((s) => s.volunteers);

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
				<VolunteersList volunteers={volunteers} />
			</div>
		</div>
	);
};

export default Volunteers;
