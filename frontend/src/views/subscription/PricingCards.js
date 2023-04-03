// ** Third Party Components
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Badge, ListGroup, ListGroupItem, Button } from 'reactstrap'
import basicPlanImage from '../../assets/images/illustration/Pot2.svg'
import standardPlanImage from '../../assets/images/illustration/Pot3.svg'
import { subscription } from '../../redux/action/contentAction'

const PricingCards = () => {
  const user = useSelector(state => state?.authReducer?.user?.[0])
  const dispatch = useDispatch()
  const colsProps = { md: 6, xs: 12 }

  const defaultCols = {
    sm: { offset: 2, size: 10 },
    lg: { offset: 2, size: 10 }
  }

  const handelUpgrade = async value => {
    await dispatch(subscription(value))
  }
  return (
    <Row className='pricing-card'>
      <Col {...defaultCols} className={classnames('mx-auto')}>
        <Row>
          <Col {...colsProps}>
            <Card
              className={classnames('text-center', {
                border: user?.isPaid === false,
                'shadow-none': user?.isPaid === false,
                popular: user?.isPaid === false,
                'border-primary': user?.isPaid === false
                // [`${item.title.toLowerCase()}-pricing`]: item.title
              })}
            >
              <CardBody>
                <img className={''} src={basicPlanImage} alt='pricing svg' />
                <h3>{'Basic'}</h3>
                <CardText>{'A free paln'}</CardText>
                <ListGroup tag='ul' className='list-group-circle text-start mb-2'>
                  <ListGroupItem tag='li'>You can watch only free content</ListGroupItem>
                </ListGroup>

                <Button block outline={user?.isPaid === false} color={'primary'} onClick={() => handelUpgrade(false)}>
                  {user?.isPaid === false ? 'Your current plan' : 'Upgrade'}
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col {...colsProps}>
            <Card
              className={classnames('text-center', {
                border: user?.isPaid === true,
                'shadow-none': user?.isPaid === true,
                popular: user?.isPaid === true,
                'border-primary': user?.isPaid === true
                // [`${item.title.toLowerCase()}-pricing`]: item.title
              })}
            >
              <CardBody>
                <div className='pricing-badge text-end'>
                  <Badge color='light-primary' pill>
                    Popular
                  </Badge>
                </div>

                <img className={''} src={standardPlanImage} alt='pricing svg' />
                <h3>{'Standard'}</h3>
                <CardText>{'A standerd paln'}</CardText>

                <ListGroup tag='ul' className='list-group-circle text-start mb-2'>
                  <ListGroupItem tag='li'>You can watch prime content</ListGroupItem>
                  <ListGroupItem tag='li'>Also you can watch free content</ListGroupItem>
                </ListGroup>
                <Link to={'/payment/standard'}>
                  <Button block outline={user?.isPaid === true} color={'primary'}>
                    {user?.isPaid === true ? 'Your current plan' : 'Upgrade'}
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default PricingCards
