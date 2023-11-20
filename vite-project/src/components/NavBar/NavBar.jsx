/** @format */

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getActiveStyles } from "../../utils";

const NavBar = () => {
	const navigate = useNavigate();
	return (
		<div>
			<div>
				<h2 onClick={() => navigate("/")}>Event Mingle</h2>
			</div>
			<div>
				<ul>
					<li>
						<NavLink style={getActiveStyles} to={"/"}>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink style={getActiveStyles} to={"/volunteers"}>
							Volunteers
						</NavLink>
					</li>
					<li>
						<NavLink style={getActiveStyles} to={"/events"}>
							Events
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default NavBar;
