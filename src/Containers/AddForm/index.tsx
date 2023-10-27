import { Button, Form, Card, Input, Space, Select, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";

const { Option } = Select;

interface FormData {
	title?: string;
	progress?: string;
	date?: Date | null;
}

const initialValues = {
	title: "",
	progress: "",
	// date: "",
};

const validationSchema = yup.object().shape({
	title: yup.string().required("Title is required"),
	progress: yup.string().required("Filled the Progress"),
	// createdBy: yup.string().required("Mixer is required"),
});

const AddForm = () => {
	const navigate = useNavigate();
	// const token = localStorage.getItem("token");

	const addFormItem = async (values: FormData) => {
		try {
			await axios.post("https://odd-tan-bunny-tutu.cyclic.app/todo", values, {
				withCredentials: true,
			});
			Swal.fire({
				icon: "success",
				title: "Add To Do List Success",
				text: "Add To Do List Success",
			});
			navigate("/dashboard");
		} catch (error) {
			console.error(error);
			Swal.fire({
				icon: "error",
				title: "Add To Do List Failed",
				text: "An error occurred during Add To Do List. Please try again.",
			});
			throw error;
		}
	};

	const formik = useFormik({
		initialValues: initialValues,
		onSubmit: addFormItem,
		validationSchema: validationSchema,
	});

	return (
		<Card title="Add New To Do List">
			<Form name="control-ref" onFinish={addFormItem} style={{ width: 350 }}>
				<Form.Item
					name="title"
					validateStatus={
						formik.touched.title && formik.errors.title ? "error" : ""
					}
					help={formik.touched.title && formik.errors.title}
				>
					<Input name="title" placeholder="Title" value={formik.values.title} />
				</Form.Item>

				<Form.Item name="progress" rules={[{ required: true }]}>
					<Select placeholder="Progress" allowClear>
						<Option value="Not Started">Not Started</Option>
						<Option value="On Progress">On Progress</Option>
						<Option value="Done">Done</Option>
					</Select>
				</Form.Item>

				<Form.Item name="priority" rules={[{ required: true }]}>
					<Select placeholder="Priority" allowClear>
						<Option value="Not Started">Low</Option>
						<Option value="On Progress">Medium</Option>
						<Option value="Done">High</Option>
					</Select>
				</Form.Item>

				<Form.Item name="date" label="Deadline" rules={[{ required: true }]}>
					<DatePicker format="YYYY-MM-DD" />
				</Form.Item>
				{/* <Form.Item
					name="date"
					validateStatus={
						formik.touched.date && formik.errors.date ? "error" : ""
					}
					help={formik.touched.date && formik.errors.date}
				>
					<Input name="date" placeholder="date" value={formik.values.date} />
				</Form.Item> */}

				{/* <Form.Item name="status">
					<Select placeholder="Select Option" allowClear>
						<Option value="active">Active</Option>
						<Option value="deactive">Deactive</Option>
					</Select>
				</Form.Item> */}

				<Form.Item>
					<Space>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
						<Button onClick={() => navigate("/dashboard")} htmlType="button">
							Back
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default AddForm;

// fetch("https://vast-tan-perch-suit.cyclic.app/song", {
// 	method: "POST",
// 	headers: {
// 		Authorization: `Bearer ${token}`,
// 		"Content-Type": "application/json",
// 	},
// 	body: JSON.stringify(values),
// })
// 	.then((response) => {
// 		if (!response.ok) {
// 			throw new Error("Error while add category");
// 		}
// 		return response.json();
// 	})
// 	.then((data) => {
// 		console.log("Success register:", data);
// 		Swal.fire({
// 			icon: "success",
// 			title: "Add Category Success",
// 			text: "Add Category Success",
// 		});
// 		navigate("/dashboard");
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 		Swal.fire({
// 			icon: "error",
// 			title: "Add Category Failed",
// 			text: "An error occurred during Add Category. Please try again.",
// 		});
// 	});
