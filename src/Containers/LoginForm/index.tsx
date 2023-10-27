import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card, Typography } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../authContext";

interface LoginPage {
	username: string;
	password: string;
}

const initialValues = {
	username: "",
	password: "",
};

const validationSchema = yup.object({
	username: yup.string().required("Username can't be blank"),
	password: yup.string().required("Please Enter your password"),
});

const LoginForm: React.FC = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const handleSubmit = async (values: LoginPage) => {
		const body = {
			username: values.username,
			password: values.password,
		};
		console.log(body);

		try {
			const response = await axios.post(
				"https://odd-tan-bunny-tutu.cyclic.app/user/login",

				body,

				{
					withCredentials: true,
				}
			);
			navigate("/dashboard");
			login(response.data.user);
			Swal.fire({
				title: "Login Success !",
				width: 600,
				padding: "3em",
			});
			return response.data;
		} catch (error) {
			console.error(error);
			Swal.fire({
				title: `User not found !`,
				width: 600,
				padding: "3em",
			});
			throw error;
		}
	};

	const formMik = useFormik({
		initialValues: initialValues,
		onSubmit: handleSubmit,
		validationSchema: validationSchema,
	});

	return (
		<Card title="Login Page" style={{ padding: "20px" }}>
			<Form
				style={{ width: "310px" }}
				onFinish={formMik.handleSubmit}
				name="normal_login"
				className="login-form"
				initialValues={{ remember: true }}
			>
				<div id="username-div" style={{ marginTop: "15px" }}>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder={"Enter Username"}
						allowClear
						value={formMik.values.username}
						onChange={formMik.handleChange("username")}
						status={formMik.errors.username && "error"}
					/>
				</div>
				<Form.Item style={{ marginBottom: "5px" }}>
					{formMik.errors.username && (
						<Typography>{formMik.errors.username}</Typography>
					)}
				</Form.Item>

				<div id="password-div">
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						allowClear
						placeholder={"Enter Password"}
						value={formMik.values.password}
						onChange={formMik.handleChange("password")}
						status={formMik.errors.password && "error"}
					/>
				</div>
				<Form.Item style={{ marginBottom: "5px" }}>
					{formMik.errors.password && (
						<Typography>{formMik.errors.password}</Typography>
					)}
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
						style={{ margin: "15px" }}
					>
						Login
					</Button>
					<Button
						type="primary"
						htmlType="submit"
						className="login-link"
						onClick={() => {
							navigate("/register");
						}}
						style={{ margin: "15px" }}
					>
						Register
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default LoginForm;

// const handleSubmit = (values: LoginPage) => {
// 	const body = {
// 		username: values.username,
// 		password: values.password,
// 	};

// 	fetch("https://vast-tan-perch-suit.cyclic.app/taylor/login", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		credentials: "include",
// 		body: JSON.stringify(body),
// 	})
// 		.then((response) => {
// 			if (!response.ok) {
// 				throw new Error("Error while login");
// 			}
// 			return response.json();
// 		})
// 		.then((data) => {
// 			if (data.accessToken) {
// 				document.cookie = `accessToken=${data.accessToken}`;
// 				console.log("Cookie is undefined or empty.");
// 			} else {
// 				console.log("Access Token is undefined or empty");
// 			}
// 			Swal.fire({
// 				title: "Login Success !",
// 				width: 600,
// 				padding: "3em",
// 			});
// 			navigate("/dashboard");
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 			Swal.fire({
// 				title: `User not found !`,
// 				width: 600,
// 				padding: "3em",
// 			});
// 		});
// };
