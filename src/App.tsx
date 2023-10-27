// import { useState } from 'react'
import "./App.css";
import LoginForm from "./Containers/LoginForm";
import RegisterForm from "./Containers/RegisterForm";
import Dashboard from "./Containers/Dashboard";
import AddForm from "./Containers/AddForm";
import EditForm from "./Containers/EditForm";
import Profile from "./Containers/Profile";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<LoginForm />} />
					<Route path="/register" element={<RegisterForm />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/add" element={<AddForm />} />
					<Route path="/edit/:id" element={<EditForm />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
