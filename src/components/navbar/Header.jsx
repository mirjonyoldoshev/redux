import { Button, Layout} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
const { Header } = Layout;
const Headerr = ({collapsed, setCollapsed}) => {
  return (
    <Header
      className="shadow-xl"
      style={{
        padding: 0,
        background: "#fff",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
    </Header>
  )
}
export default Headerr
