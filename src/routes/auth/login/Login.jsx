import {Button, Checkbox, Form, Input, Typography, Divider, notification} from 'antd';
import {Link, useNavigate} from "react-router-dom";
import {GoogleLogin} from '@react-oauth/google';
import TelegramLoginButton from 'telegram-login-button'
import axios from "../../../api/Index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {ERROR, LOADING, LOGIN_USER} from "../../../redux/action/Types.jsx";

const {Title, Text} = Typography

const Login = () => {
  const navigate = useNavigate()
  const authData = useSelector(state => state)
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    try {
      dispatch({type: LOADING})
      const res = await axios.post("/auth/login", values)
      const data = res.data.payload
      if (res.status === 200 && data.token) {
        notification.success({
          message: 'Log In Successful',
          description: 'You have successfully logged-in.',
          showProgress: true,
        });
        dispatch({type: LOGIN_USER, token: data.token, user: data.user})
        navigate("/dashboard")
      } else {
        throw new Error("Something went wrong")
      }
    } catch (error) {
      dispatch({type: ERROR, message: error.response?.data?.message || error})
      notification.error({
        message: 'Log In Failed',
        description: error.response?.data?.message || error,
        showProgress: true,
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      layout="vertical"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 24,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title className="text-center block pb-2">Log In</Title>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          span: 24,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <Button loading={authData.loading} disabled={authData.loading} className="w-full" type="primary" htmlType="submit">
          Log In
        </Button>
      </Form.Item>
      <Divider><Text>Or</Text></Divider>
      <div className="flex justify-center items-center w-full flex-col my-4 gap-2">
        <GoogleLogin
          onSuccess={async credentialResponse => {
            const decodedData = JSON.parse(atob(credentialResponse.credential.split(".")[1]))
            const user = {
              username: decodedData.email,
              password: decodedData.sub
            }
            try {
              dispatch({type: LOADING})
              const res = await axios.post("/auth/login", user)
              const data = res.data.payload
              if (res.status === 200 && data.token) {
                notification.success({
                  message: 'Log In Successful',
                  description: 'You have successfully logged-in.',
                  showProgress: true,
                });
                dispatch({type: LOGIN_USER, token: data.token, user: data.user})
              } else {
                throw new Error("Something went wrong")
              }
            } catch (error) {
              dispatch({type: ERROR, message: error.response?.data?.message || error})
              notification.error({
                message: 'Log In Failed',
                description: error.response?.data?.message || error,
                showProgress: true,
              });
            }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        <TelegramLoginButton
          botName="test"
          dataOnauth={(user) => console.log(user)}
        />
      </div>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <Text className="text-center block"> Don't have an account? <Link to="/auth/register">Register</Link></Text>
    </Form>
  )
}
export default Login
