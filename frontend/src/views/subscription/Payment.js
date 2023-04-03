/*eslint-disable*/
// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Label,
  Input,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  InputGroup,
  FormFeedback,
  InputGroupText
} from 'reactstrap'

// ** Third Party Components
import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'

// ** Card Images
import jcbCC from '@src/assets/images/icons/payments/jcb-cc.png'
import amexCC from '@src/assets/images/icons/payments/amex-cc.png'
import uatpCC from '@src/assets/images/icons/payments/uatp-cc.png'
import visaCC from '@src/assets/images/icons/payments/visa-cc.png'
import dinersCC from '@src/assets/images/icons/payments/diners-cc.png'
import maestroCC from '@src/assets/images/icons/payments/maestro-cc.png'
import discoverCC from '@src/assets/images/icons/payments/discover-cc.png'
import mastercardCC from '@src/assets/images/icons/payments/mastercard-cc.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { subscription } from '../../redux/action/contentAction'

const cardsObj = {
  jcb: jcbCC,
  uatp: uatpCC,
  visa: visaCC,
  amex: amexCC,
  diners: dinersCC,
  maestro: maestroCC,
  discover: discoverCC,
  mastercard: mastercardCC
}

const PaymentMethods = () => {
  // ** States
  const [cardType, setCardType] = useState('')
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const defaultValues = {
    cardInput: '',
    cardName: '',
    cvv: '',
    expDate: ''
  }
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = async data => {
    if (data.cardInput.length <= 0) {
      setError('cardInput', {
        type: 'manual',
        message: 'Please Enter Valid Card Number'
      })
    }
    const response = await dispatch(
      subscription(params?.type === 'standard', data?.cardInput, data?.cardName, data?.cvv, data?.expDate)
    )
    if (response?.data?.status === 200) {
      navigate('/subscription')
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Payment Methods</CardTitle>
        </CardHeader>
        <CardBody className='my-1 py-25'>
          <Row className='gx-4'>
            <Col lg='6'>
              <Row tag={Form} className='gx-2 gy-1' onSubmit={handleSubmit(onSubmit)}>
                <Col xs={12}>
                  <div className='mb-1'>
                    <h4 className='form-check-label' for='card-radio'>
                      Credit/Debit/ATM Card
                    </h4>
                  </div>
                </Col>

                <Fragment>
                  <Col xs={12}>
                    <Label className='form-label' for='credit-card'>
                      Card Number
                    </Label>
                    <InputGroup>
                      <Controller
                        id='credit-card'
                        name='cardInput'
                        control={control}
                        placeholder='1356 3215 6548 7898'
                        render={({ field }) => (
                          <Cleave
                            {...field}
                            name='cardInput'
                            className={classnames('form-control', { 'is-invalid': errors.cardInput })}
                            options={{ creditCard: true, onCreditCardTypeChanged: type => setCardType(type) }}
                          />
                        )}
                      />
                      {cardType !== '' && cardType !== 'unknown' ? (
                        <InputGroupText>
                          <img height='24' alt='card-type' src={cardsObj[cardType]} />
                        </InputGroupText>
                      ) : null}
                    </InputGroup>
                    {errors.cardInput ? (
                      <FormFeedback className='d-block'>{errors.cardInput.message}</FormFeedback>
                    ) : null}
                  </Col>
                  <Col md={6}>
                    <Label className='form-label' for='card-name'>
                      Name On Card
                    </Label>
                    <Controller
                      id='cardName'
                      name='cardName'
                      control={control}
                      render={({ field }) => <Input {...field} id='card-name' name='cardName' placeholder='John Doe' />}
                    />
                  </Col>
                  <Col xs={6} md={3}>
                    <Label className='form-label' for='exp-date'>
                      Exp. Date
                    </Label>
                    <Controller
                      id='expDate'
                      name='expDate'
                      control={control}
                      render={({ field }) => (
                        <Cleave
                          {...field}
                          id='exp-date'
                          name='expDate'
                          placeholder='MM/YY'
                          className='form-control'
                          options={{ delimiter: '/', blocks: [2, 2] }}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={6} md={3}>
                    <Label className='form-label' for='cvv'>
                      CVV
                    </Label>
                    <Controller
                      id='cvv'
                      name='cvv'
                      control={control}
                      render={({ field }) => (
                        <Cleave
                          {...field}
                          id='cvv'
                          placeholder='654'
                          name='cvv'
                          className='form-control'
                          options={{ blocks: [3] }}
                        />
                      )}
                    />
                  </Col>

                  <Col className='mt-2 pt-1' xs={12}>
                    <Button type='submit' className='me-1' color='primary'>
                      Submit
                    </Button>
                    <Link to='/'>
                      <Button color='secondary' outline>
                        Cancel
                      </Button>
                    </Link>
                  </Col>
                </Fragment>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default PaymentMethods
