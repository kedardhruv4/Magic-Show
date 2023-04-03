// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, Button, CardBody, CardTitle, CardHeader } from 'reactstrap'

// ** Third Party Components
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Custom Components
import PasswordInput from '../../components/PasswordInput'
import { useDispatch } from 'react-redux'
import { authChangePassword } from '../../redux/action/authAction'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const defaultValues = {
  newPassword: '',
  currentPassword: '',
  retypeNewPassword: ''
}

const SecurityTabContent = () => {
  const dispatch = useDispatch()
  const SignupSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .min(8, obj => showErrors('Current Password', obj.value.length, obj.min))
      .required(),
    newPassword: yup
      .string()
      .min(8, obj => showErrors('New Password', obj.value.length, obj.min))
      .required(),
    retypeNewPassword: yup
      .string()
      .min(8, obj => showErrors('Retype New Password', obj.value.length, obj.min))
      .required()
      .oneOf([yup.ref(`newPassword`), null], 'Passwords must match')
  })
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = async data => {
    if (Object.values(data).every(field => field.length > 0)) {
      const finalData = {
        password: data?.currentPassword,
        newPassword: data?.newPassword
      }

      await dispatch(authChangePassword(finalData))
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Change Password</CardTitle>
        </CardHeader>
        <CardBody className='pt-1'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm='6' className='mb-1'>
                <PasswordInput
                  control={control}
                  name='currentPassword'
                  label='Current Password'
                  id='currentPassword'
                  placeholder='Current Password'
                  autoFocus={false}
                  className='input-group-merge'
                  error={errors?.currentPassword?.message}
                />
              </Col>
            </Row>
            <Row>
              <Col sm='6' className='mb-1'>
                <PasswordInput
                  control={control}
                  name='newPassword'
                  label='New Password'
                  id='newPassword'
                  placeholder='New Password'
                  autoFocus={false}
                  className='input-group-merge'
                  error={errors?.newPassword?.message}
                />
              </Col>
              <Col sm='6' className='mb-1'>
                <PasswordInput
                  control={control}
                  name='retypeNewPassword'
                  label='Retype New Password'
                  id='retypeNewPassword'
                  placeholder='Retype New Password'
                  autoFocus={false}
                  className='input-group-merge'
                  error={errors?.retypeNewPassword?.message}
                />
              </Col>
              <Col xs={12}>
                <p className='fw-bolder'>Password requirements:</p>
                <ul className='ps-1 ms-25'>
                  <li className='mb-50'>Minimum 8 characters long - the more, the better</li>
                  <li className='mb-50'>At least one lowercase character</li>
                  <li>At least one number, symbol, or whitespace character</li>
                </ul>
              </Col>
              <Col className='mt-1' sm='12'>
                <Button type='submit' className='me-1' color='primary'>
                  Save changes
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default SecurityTabContent
