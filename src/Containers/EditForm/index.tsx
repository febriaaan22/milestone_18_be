import React from "react";
import { Button, Form, Card, Space, Select, DatePicker } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const { Option } = Select;

interface EditData {
	progress: string;
	Date: Date | null;
}

const EditForm: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	// const validate = localStorage.getItem("token");

	const editCategory = async (values: EditData) => {
		try {
			const body = {
				id,
				...values,
			};
			const response = await axios.put(
				`https://odd-tan-bunny-tutu.cyclic.app/todo/${id}`,
				body,
				{
					withCredentials: true,
				}
			);
			Swal.fire({
				icon: "success",
				title: "Edit To Do List Success",
				text: "Edit To Do List Success",
			});
			navigate("/dashboard");
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	return (
		<Card
			title="Edit To Do List"
			style={{
				maxWidth: "400px",
				width: "100%",
				padding: "20px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Form
				name="edit-item-form"
				onFinish={editCategory}
				style={{ maxWidth: 600 }}
			>
				<Form.Item name="progress" rules={[{ required: true }]}>
					<Select placeholder="Select a status option" allowClear>
						<Option value="Not Started">Not Started</Option>
						<Option value="On Progress">On Progress</Option>
						<Option value="Done">Done</Option>
					</Select>
				</Form.Item>

				<Form.Item name="date" label="Date" rules={[{ required: true }]}>
					<DatePicker format="YYYY-MM-DD" />
				</Form.Item>

				{/* <Form.Item name="is_active" rules={[{ required: true }]}>
					<Select placeholder="Select a status option" allowClear>
						<Option value="true">Active</Option>
						<Option value="false">Deactive</Option>
					</Select>
				</Form.Item> */}

				<Form.Item>
					<Space>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
						<Button
							htmlType="button"
							onClick={() => {
								navigate("/dashboard");
							}}
						>
							Back
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default EditForm;

// console.log(values);
// const body = {
// 	id,
// 	...values,
// };
// console.log(JSON.stringify(body));
// fetch("http://localhost:1989/song/${id}", {
// 	method: "PUT",
// 	headers: {
// 		"Content-Type": "application/json",
// 	},
// 	credentials: "same-origin",
// 	body: JSON.stringify(body),
// })
// 	.then((response) => {
// 		if (!response.ok) {
// 			throw new Error("Error while edit category");
// 		}
// 		// return response.json();
// 	})
// 	.then((data) => {
// 		console.log("Success register:", data);
// 		Swal.fire({
// 			icon: "success",
// 			title: "Edit Category Success",
// 			text: "Edit Category Success",
// 		});
// 		navigate("/dashboard");
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 		Swal.fire({
// 			icon: "error",
// 			title: "Edit Category Failed",
// 			text: "An error occurred during Edit Category. Please try again.",
// 		});
// 	});
