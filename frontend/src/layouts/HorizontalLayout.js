// ** React Imports
import { Outlet } from 'react-router-dom'

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/HorizontalLayout'

// ** Menu Items Array
import subscriptionMenu from '@src/navigation/horizontal/subscriptionMenu'

const HorizontalLayout = props => {
  // const user = useSelector(state => state?.authReducer?.user?.[0])
  // const menuData = user?.type === 'A' ? subscriptionMenu : navigation

  return (
    <Layout menuData={subscriptionMenu} {...props}>
      <Outlet />
    </Layout>
  )
}

export default HorizontalLayout
