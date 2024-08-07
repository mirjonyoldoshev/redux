import {Outlet} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

const Auth = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[]#f7f7f7">
      <div className="shadow-form max-w-[450px] w-full bg-white p-[24px] rounded-2xl">
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOLE_CLIENT_ID}>
          <Outlet/>
        </GoogleOAuthProvider>
      </div>
    </div>
  )
}
export default Auth
