import { Card, Space } from 'antd'
import Navigation from '../../components/Navigation'

const Profile = () => {
  return (
    <>
      <Navigation />
      <Space direction="vertical" size={16}>
        <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Space>
    </>
  )
}

export default Profile