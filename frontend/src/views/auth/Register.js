// ** React Imports
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button, FormFeedback } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import { useForm } from 'react-hook-form'
import PasswordInput from '../../components/PasswordInput'
import TextInput from '../../components/TextInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { registrationSchema } from '../../constants/validattion'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { registration } from '../../redux/action/authAction'
import logo from '../../assets/images/logo/logo.png'

const Register = () => {
  // ** Hooks
  const { skin } = useSkin()

  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default
  const navigate = useNavigate()
  const user = useSelector(state => state?.authReducer?.user)
  const dispatch = useDispatch()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(registrationSchema)
  })

  const onSubmit = async data => {
    const finalData = {
      ...data,
      type: 'U'
    }
    const response = await dispatch(registration(finalData))
    if (response?.status === 200) {
      toast.success('Registration successfully')
      navigate('/login')
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
          <Col className='px-xl-2 mx-auto' xs='12' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Adventure starts here 🚀
            </CardTitle>
            <CardText className='mb-2'>Make your app management easy and fun!</CardText>
            <Form className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <TextInput
                  control={control}
                  name='username'
                  label='Username'
                  type='text'
                  id='register-username'
                  placeholder='johndoe'
                  autoFocus={true}
                  className=''
                  error={errors?.username?.message}
                />
              </div>
              <div className='mb-1'>
                <TextInput
                  control={control}
                  name='email'
                  label='Email'
                  type='email'
                  id='register-email'
                  placeholder='john@example.com'
                  autoFocus={false}
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
              </div>
              <div className='form-check mb-1'>
                {/* <Input type='checkbox' id='terms' name='terms' /> */}

                <TextInput
                  control={control}
                  name='terms'
                  label=''
                  type='checkbox'
                  id='register-checkbox'
                  placeholder=''
                  autoFocus={false}
                  className=''
                  error={''}
                />
                <Label className='form-check-label' for='terms'>
                  I agree to
                  <a className='ms-25' href='/' onClick={e => e.preventDefault()}>
                    privacy policy & terms
                  </a>
                </Label>
              </div>

              {errors?.terms?.message && <div className='text-danger'>{errors?.terms?.message}</div>}
              <Button type='submit' color='primary' block>
                Sign up
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>Already have an account?</span>
              <Link to='/login'>
                <span>Sign in instead</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register
