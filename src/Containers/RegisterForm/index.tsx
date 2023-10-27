import React from "react";
import { Button, Form, Input, Card, Typography } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// const { Option } = Select;

interface RegisterPage {
	username: string;
	password: string;
	// role: string;
}

const initialValues = {
	username: "",
	password: "",
	// role: "",
};

const validationSchema = yup.object({
	username: yup.string().required("The username must be a valid username"),
	password: yup.string().required("The Password Field is required"),
	// role: yup.string().required("Role is required"),
	// .matches(
	// 	/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
	// 	"The Password must be exactly 13 characters long, must contain at least one letter, one number and one special character"
	// ),
});

const RegisterForm: React.FC = () => {
	const navigate = useNavigate();

	const handleSubmit = (values: RegisterPage) => {
		fetch("https://odd-tan-bunny-tutu.cyclic.app/user/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error while register");
				}
				return response.json();
			})
			.then((data) => {
				console.log("Success register:", data);
				Swal.fire({
					icon: "success",
					title: "Registration Success",
					text: "Registration Success",
				});
				navigate("/");
			})
			.catch((error) => {
				console.log(error);
				Swal.fire({
					icon: "error",
					title: "Registration Failed",
					text: "An error occurred during registration. Please try again.",
				});
			});
	};

	const formik = useFormik({
		initialValues: initialValues,
		onSubmit: handleSubmit,
		validationSchema: validationSchema,
	});

	const handleRegister = () => {
		formik.validateForm().then(() => {
			if (Object.keys(formik.errors).length === 0) {
				formik.handleSubmit();
			}
		});
	};

	// const handleLogin = () => {
	//     navigate('/login');
	// };

	return (
		<Card title="Register Page" style={{ width: "400px" }}>
			<Form
				style={{ maxWidth: 600 }}
				name="register_page"
				className="register"
				initialValues={{ remember: true }}
				onFinish={formik.handleSubmit}
			>
				<div id="username-div">
					<Input
						placeholder="Username"
						value={formik.values.username}
						onChange={formik.handleChange("username")}
						status={formik.errors.username && "error"}
					/>
				</div>

				<Form.Item>
					{formik.errors.username && (
						<Typography>{formik.errors.username}</Typography>
					)}
				</Form.Item>

				<div id="password-div">
					<Input
						type="password"
						placeholder="Enter Password"
						value={formik.values.password}
						onChange={formik.handleChange("password")}
						status={formik.errors.password && "error"}
					/>
				</div>

				<Form.Item>
					{formik.errors.password && (
						<Typography>{formik.errors.password}</Typography>
					)}
				</Form.Item>

				{/* <Form.Item name="role" rules={[{ required: true }]}>
					<Select placeholder="Select a Role" allowClear>
						<Option value="admin">Admin</Option>
						<Option value="user">User</Option>
					</Select>
				</Form.Item> */}

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button
						type="primary"
						htmlType="button"
						onClick={handleRegister}
						style={{ margin: "12px" }}
					>
						Register
					</Button>
					{/* <Button type="primary" htmlType="button" onClick={handleLogin} >
        Login
    </Button> */}
				</Form.Item>
			</Form>
		</Card>
	);
};

export default RegisterForm;
