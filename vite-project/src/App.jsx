/** @format */

import "./App.css";
import { RouterProvider } from "react-router-dom";
import MyBrowserRouter from "./MyRouter/MyBrowserRouter.jsx";
function App() {
	return (
		<>
			<RouterProvider router={MyBrowserRouter} />
		</>
	);
}

export default App;
