import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import {useState} from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Headerr from "../../components/navbar/Header.jsx";
import {useFetch} from "../../hooks/useFetch.jsx";

const {Content} = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [data, loading] = useFetch("/auth/profile")
  return (
    <Layout className="h-screen">
      <Sidebar collapsed={collapsed} userProfileData={data?.payload} loading={loading}/>
      <Layout>
        <Headerr collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Content className="bg-white rounded-2xl shadow-xl p-6 my-6 mx-4 min-h-[280px]">
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  )
}
export default Dashboard
