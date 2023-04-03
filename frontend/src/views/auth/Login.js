import { useSkin } from '@hooks/useSkin'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, CardTitle, CardText, Form, Button } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TextInput from '../../components/TextInput'
import { loginSchema } from '../../constants/validattion'
import PasswordInput from '../../components/PasswordInput'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/action/authAction'
import { useEffect } from 'react'
import logo from '../../assets/images/logo/logo.png'
const Login = () => {
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const user = useSelector(state => state?.authReducer?.user)

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  // const logo = require('@src/assets/images/logo/logo.svg').default
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = async data => {
    const response = await dispatch(login(data))

    if (response?.data?.status === 200) {
      navigate('/movies')
    }
  }
  useEffect(() => {
    if (user?.length) {
      navigate('/movies')
    }
  }, [user])
  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <img className='logo-image' src={logo} alt='Logo image' />
          <h2 className='brand-text text-primary ms-1'>MagicShow Entertainment</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to MagicShow Entertainment! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <TextInput
                  control={control}
                  name='email'
                  label='Email'
                  type='email'
                  id='login-email'
                  placeholder='john@example.com'
                  autoFocus={true}
                  className=''
                  error={errors?.email?.message}
                />
              </div>
              <div className='mb-1'>
                <PasswordInput
                  control={control}
                  name='password'
                  label='Password'
                  id='login-password'
                  placeholder='password'
                  autoFocus={false}
                  className=''
                  error={errors?.password?.message}
                />
                {/* <Link to='/forgot-password'>
                  <small>Forgot Password?</small>
                </Link> */}
              </div>
              <Button type='submit' color='primary' block>
                Sign in
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
