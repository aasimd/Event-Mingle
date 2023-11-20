/** @format */
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

const Root = lazy(() => import("../pages/Root/Root"));
const Home = lazy(() => import("../pages/Home/Home"));
const EventRoot = lazy(() => import("../pages/EventRoot/EventRoot"));
const Events = lazy(() => import("../pages/Events/Events"));
const VolunteerRoot = lazy(() =>
	import("../pages/VolunteerRoot/VolunteerRoot")
);
const Volunteers = lazy(() => import("../pages/Volunteers/Volunteers"));
const VolunteerDetails = lazy(() =>
	import("../pages/VolunteerDetails/VolunteerDetails")
);
const EventDetails = lazy(() => import("../pages/EventDetails/EventDetails"));

const LoadingFrag = () => {
	return <h1>Loading...</h1>;
};
const ErrorFrag = () => {
	const { error: eventsError } = useSelector((s) => s.events);
	const { error: volunteersError } = useSelector((s) => s.events);
	return (
		<div>
			<h1>Some Error Occurred / Route Not Found</h1>
			<p>{eventsError ?? volunteersError}</p>
			<p>Check Console for more Details</p>
		</div>
	);
};

const MyBrowserRouter = createBrowserRouter([
	{
		path: "/",
		errorElement: <ErrorFrag />,
		element: (
			<Suspense fallback={<LoadingFrag />}>
				<Root />
			</Suspense>
		),
		children: [
			{
				path: "",
				element: (
					<Suspense fallback={<LoadingFrag />}>
						<Home />
					</Suspense>
				)
			},
			{
				path: "/volunteers",
				element: (
					<Suspense fallback={<LoadingFrag />}>
						<VolunteerRoot />
					</Suspense>
				),
				children: [
					{
						path: "",
						element: (
							<Suspense fallback={<LoadingFrag />}>
								<Volunteers />
							</Suspense>
						)
					},
					{
						path: "/volunteers/:volunteerId",
						element: (
							<Suspense fallback={<LoadingFrag />}>
								<VolunteerDetails />
							</Suspense>
						)
					}
				]
			},
			{
				path: "/events",
				element: (
					<Suspense fallback={<LoadingFrag />}>
						<EventRoot />
					</Suspense>
				),
				children: [
					{
						path: "",
						element: (
							<Suspense fallback={<LoadingFrag />}>
								<Events />
							</Suspense>
						)
					},
					{
						path: "/events/:eventId",
						element: (
							<Suspense fallback={<LoadingFrag />}>
								<EventDetails />
							</Suspense>
						)
					}
				]
			}
		]
	}
]);

export default MyBrowserRouter;
