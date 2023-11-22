/** @format */

import { useDispatch, useSelector } from "react-redux";
import { fetchVolunteers } from "../../pages/Volunteers/VolunteersSlice";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { getEventVolunteersList } from "../../utils";

const VolunteersListForEventDetailsPage = ({ eventVolunteers }) => {
	const { volunteers, status, error } = useSelector((s) => s.volunteers);
	const dispatch = useDispatch();
	const volunteersObjs = getEventVolunteersList(eventVolunteers, volunteers);
	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchVolunteers());
		}
	}, [status, dispatch]);
	if (status === "loading") return <h1>Loading...</h1>;
	if (status === "error") return <p>{error}</p>;
	return (
		<div>
			<p>
				Volunteers:{" "}
				{volunteersObjs.map((v, index) => {
					return (
						<NavLink to={`/volunteers/${v._id}`}>
							{v.name}
							{index !== volunteersObjs.length - 1 && ","}{" "}
						</NavLink>
					);
				})}
			</p>
		</div>
	);
};

export default VolunteersListForEventDetailsPage;
