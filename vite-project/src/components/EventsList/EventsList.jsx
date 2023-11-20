/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

const EventsList = ({ events }) => {
	
	return (
		<div>
			<ul>
				{events.map((e) => (
					<li key={e._id}>
						<NavLink to={`/events/${e._id}`}>{e.name}</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
};

export default EventsList;
