/** @format */

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getActiveStyles } from "../../utils";
import "./NavBar.css";
const NavBar = () => {
	const navigate = useNavigate();
	return (
		<div>
			{" "}
			<div>
				Source Code:{" "}
				<a target="_blank" href="https://github.com/aasimd/Event-Mingle">
					<b title="event-mingle">Github</b>
				</a>
			</div>
			<div className="nav-bar">
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
		</div>
	);
};

export default NavBar;
