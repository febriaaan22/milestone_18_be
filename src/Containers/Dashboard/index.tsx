import React, { useEffect, useState } from "react";
import { Form, Button, Space, Table, Card, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";

interface DataType {
	_id: string;
	title: string;
	progress: string;
	date: Date;
	// is_active: string | number | boolean;
}

// interface ApiResponse {
//     result: DataType[];
// }

const Dashboard: React.FC = () => {
	// const validate = "accessToken";
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			await axios.post(
				"https://odd-tan-bunny-tutu.cyclic.app/user/logout",
				{},
				{
					withCredentials: true,
				}
			);
			navigate("/");
		} catch (error) {
			console.error(error);
			throw error;
		}
	};
	const apiUrl = "https://odd-tan-bunny-tutu.cyclic.app/todo";
	const [data, setData] = useState<DataType[]>([]);
	console.log(data);

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				const response = await axios.get(apiUrl, {
					withCredentials: true,
				});
				// console.log(response.data);
				setData(response.data.todos);
			} catch (error) {
				console.error(error);
			}
		};

		fetchTodos();
	}, []);

	const columns: ColumnsType<DataType> = [
		// {
		// 	title: "ID",
		// 	dataIndex: "_id",
		// 	key: "_id",
		// },
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
		},
		{
			title: "Progress",
			dataIndex: "progress",
			key: "progress",
			filters: [
				{ text: "Not Started", value: "Not Started" },
				{ text: "On Progress", value: "On Progress" },
				{ text: "Done", value: "Done" },
			],
			onFilter: (value, record) => record.progress === value,
			render: (progress) => (
				<span
					style={{
						color:
							progress === "Not Started"
								? "red"
								: progress === "On Progress"
								? "blue"
								: "green",
					}}
				>
					{progress}
				</span>
			),
		},
		{
			title: "Priority",
			dataIndex: "priority",
			key: "priority",
			filters: [
				{ text: "Low", value: "Low" },
				{ text: "Medium", value: "Medium" },
				{ text: "High", value: "High" },
			],
			onFilter: (value, record) => record.progress === value,
			render: (progress) => (
				<span
					style={{
						color:
							progress === "Low"
								? "green"
								: progress === "Medium"
								? "yellow"
								: "red",
					}}
				>
					{progress}
				</span>
			),
		},
		{
			title: "Deadline",
			dataIndex: "date",
			key: "date",
			render: (date: Date) => moment(date).format("YYYY-MM-DD"),
		},
		{
			title: "Action",
			key: "action",
			render: (_, dataId) => (
				<Space>
					<Button onClick={() => navigate(`/edit/${dataId._id}`)}>Edit</Button>
					<Button type="primary" onClick={() => deleteItem(dataId._id)}>
						Delete
					</Button>
				</Space>
			),
		},
	];
	const deleteItem = async (deleted: string) => {
		const apiUrl = `https://odd-tan-bunny-tutu.cyclic.app/todo/${deleted}`;
		try {
			await axios.delete(apiUrl, {
				withCredentials: true,
			});
			message.config({
				top: 100,
			});
			message.success("To Do List Deleted!");
			// setTimeout(() => {
			// 	window.location.reload();
			// }, 1250);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};
	return (
		<>
			<Card style={{ padding: "20px" }}>
				<Form.Item>
					<Button
						type="primary"
						className="login-link"
						onClick={() => navigate("/add")}
						style={{ marginRight: "550px" }}
					>
						Add New To Do List
					</Button>
					<Button type="primary" className="login-link" onClick={handleLogout}>
						Logout
					</Button>
				</Form.Item>
				<Table
					columns={columns}
					dataSource={data}
					pagination={{
						pageSize: 6,
						total: data.length,
					}}
					style={{ width: "800px" }}
					rowKey="id"
				/>
			</Card>
		</>
	);
};

export default Dashboard;

// const fetchData = async () => {
// 	try {
// 		const response = await fetch(apiUrl, {
// 			method: "GET",
// 			headers: {
// 				Authorization: `Bearer ${validate}`,
// 			},
// 			credentials: "include",
// 		});
// 		if (response.ok) {
// 			const data = await response.json();
// 			console.log(response);
// 			setData(data.data);
// 		} else {
// 		}
// 	} catch (error) {
// 		// Handle fetch error here
// 	}
// };
// useEffect(() => {
// 	fetchData();
// }, []);
