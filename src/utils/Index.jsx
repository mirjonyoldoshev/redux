import {Flex, Spin, Typography} from 'antd';
import {Suspense} from "react";

const {Title} = Typography
const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Flex align="center" gap="middle">
        <Spin tip="Loading..." size="large" />
      </Flex>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
const SuspenseElement = ({children}) => {
  return (
    <Suspense fallback={<Loading/>}>
      {children}
    </Suspense>
  )
}

const ContentTitle = ({children}) => {
  return <Title level={3}>{children}</Title>
}


export {Loading, SuspenseElement, ContentTitle}
