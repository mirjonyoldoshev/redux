import "./Sidebar.css"
import {Button, Layout, Menu, Modal, notification, Skeleton, Typography} from "antd";
import {UserOutlined, ProductOutlined} from '@ant-design/icons';
import {NavLink, useNavigate} from "react-router-dom";
import {Avatar, Badge} from 'antd';
import {SIGN_OUT} from "../../redux/action/Types.jsx";
import {useState} from "react";
import {BsFillDoorOpenFill} from "react-icons/bs";
import {useDispatch} from "react-redux";

const {Text} = Typography
const {Sider} = Layout;

const Sidebar = ({collapsed, userProfileData, loading}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("You will be signed out");


  const handleOk = () => {
    setModalText("Signed out successfully");
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
    dispatch({type: SIGN_OUT});
    navigate("/auth");

    notification.success({
      message: 'Signed out successfully',
      description: 'You have been signed out successfully.',
    });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSingOut = () => {
    setOpen(true);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className="py-7 px-2">
      <div className="flex items-center gap-5 p-3 overflow-hidden whitespace-nowrap">
        <Badge count={1}>
          {
            loading ? <Skeleton.Avatar active size="large" className="rounded-full bg-slate-500"/>
              : <Avatar className="bg-amber-500">{userProfileData?.first_name.at(0)}</Avatar>
          }
        </Badge>
        {
          loading ? <div>
              <Skeleton.Input active size="small" className="bg-slate-500 rounded h-[20px]"/>
              <Skeleton.Input active size="small" className="bg-slate-500 rounded max-w-[50px] h-[20px]"/>
            </div> :
            <Text className="text-white flex-col flex justify-center gap-1">
              <span
                className="text-[16px] leading-[12px]">{loading ? "Loading..." : userProfileData?.first_name.split(" ")[0]}</span>
              <span className="text-3">{userProfileData?.role}</span>
            </Text>
        }
      </div>
      <div className="flex flex-col justify-between flex-1">
        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              key: '1',
              icon: <ProductOutlined/>,
              label: <NavLink end to="/dashboard">Products</NavLink>,
            },
            {
              key: '2',
              icon: <UserOutlined/>,
              label: <NavLink to="/dashboard/users">Users</NavLink>,
            }
          ]}
        />
        <Button
          className="mt-auto mx-2 whitespace-normal"
          danger
          type="primary"
          onClick={handleSingOut}
        >

          {!collapsed && (
            <span className="text-[12px]">Sign Out </span>
          )}
          <span><BsFillDoorOpenFill/></span>
        </Button>
      </div>
      <Modal
        maskClosable={false}
        title="Sign Out"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </Sider>
  )
}
export default Sidebar
