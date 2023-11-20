/** @format */

import React from "react";
import { Outlet } from "react-router-dom";

const EventRoot = () => {
	return (
		<div>
			<Outlet />
		</div>
	);
};

export default EventRoot;
