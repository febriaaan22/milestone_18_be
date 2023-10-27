import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Form, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PageProfile {
	name?: string;
	phone?: string;
	username?: string;
}

const Profile: React.FC = () => {
	const [profilePage, setProfilePage] = useState<PageProfile | null>(null); // Initialize with null
	const navigate = useNavigate();
	const validate = localStorage.getItem("token");

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				const response = await fetch(
					"https://mock-api.arikmpt.com/api/user/profile",
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${validate}`,
						},
					}
				);

				if (response.ok) {
					const data = await response.json();
					setProfilePage(data.data);
				} else {
					console.error("Failed to fetch profile data");
				}
			} catch (error) {
				console.error("Error while fetching profile data:", error);
			}
		};

		fetchProfileData();
	}, [validate]);

	return (
		<Card title="MY PROFILE" style={{ width: "400px", padding: "15px" }}>
			<Space wrap size={16}>
				<Avatar size="large" icon={<UserOutlined />} />
			</Space>
			<Form.Item style={{ marginTop: "10px" }}>
				Login as: {profilePage?.name} <br />
				Username: {profilePage?.username} <br />
			</Form.Item>
			<Form.Item>
				<Button
					htmlType="button"
					onClick={() => {
						navigate("/table");
					}}
				>
					Back
				</Button>
			</Form.Item>
		</Card>
	);
};

export default Profile;
