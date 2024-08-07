import {ContentTitle} from "../../../utils/Index.jsx";
import {Button} from "antd";
import DashboardContent from "../../../components/dahboardContent/DashboardContent.jsx";
import {useState} from "react";

const Users = () => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const columns = [
    {
      title: 'No.',
      key: "id",
      render: (text, record, index) =>
        tableParams.pagination.pageSize * (tableParams.pagination.current - 1) + (index + 1),
      width: '10%',
    },
    {
      key: "First_name",
      title: 'Firstname',
      dataIndex: 'first_name',
      sorter: true,
    },
    {
      key: "Last_name",
      title: 'Username',
      dataIndex: 'username',
      sorter: true,
    },
    {
      key: "Role",
      title: 'Role',
      dataIndex: 'role',
      sorter: true,
    },
    {
      key: "Created_at",
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (data) => new Date(data).toLocaleDateString('uz-UZ', { timeZone: 'Asia/Tashkent' }),
      sorter: true,
    },
    {
      key: "Action",
      title: 'Action',
      render: (user) => (
        <Button type="primary">Promote</Button>
      // onClick={() => handleChangeUserPromotion(user)}
      ),
      width: "10%"
    }
  ];

  return (
    <div>
      <div className="flex justify-between">
        <ContentTitle>Users</ContentTitle>
        <Button type="primary">Add new user</Button>
      </div>
      <DashboardContent columns={columns} setTableParams={setTableParams} tableParams={tableParams} url="/admin/registered-users" />
    </div>
  )
}
export default Users
