// ** React Imports
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { Lock, Power, Youtube } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../../redux/action/authAction'

// ** Default Avatar Image
// import defa ultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

const UserDropdown = () => {
  const dispatch = useDispatch()
  const naviate = useNavigate()
  const user = useSelector(state => state?.authReducer?.user?.[0])

  const hendelLogout = async e => {
    e.preventDefault()
    const response = await dispatch(logout())

    if (response?.status === 200) {
      naviate('/login')
    } else {
      naviate('/login')
    }
  }
  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{user?.username || 'John Doe'}</span>
        </div>
        <Avatar color='light-primary' content={user?.username || 'John Doe'} initials />
        {/* <Avatar img={defaultAvatar} imgHeight='40' imgWidth='40' status='online' /> */}
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/add-content'>
          <Youtube size={14} className='me-75' />
          <span className='align-middle'>Add content</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/change-password'>
          <Lock size={14} className='me-75' />
          <span className='align-middle'>Change Password</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/' onClick={e => hendelLogout(e)}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
