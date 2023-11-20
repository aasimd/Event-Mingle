/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
const VolunteersList = ({ volunteers }) => {
	return (
		<div>
			<ul>
				{volunteers.map((v) => (
					<li key={v._id}>
						<NavLink to={`/volunteers/${v._id}`}>{v.name}</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
};

export default VolunteersList;
