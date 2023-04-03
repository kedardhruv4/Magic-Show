// ** Reactstrap Imports
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardImg,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'

// ** Images
import img1 from '@src/assets/images/slider/04.jpg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { contentDelete } from '../redux/action/contentAction'
import toast from 'react-hot-toast'
import playBtn from '../assets/images/svg/play.svg'
import { useState } from 'react'
import { Edit, Eye, Trash2 } from 'react-feather'

const CardTitles = props => {
  const dispatch = useDispatch()
  const { to, data, edit, refresh } = props
  const [basicModal, setBasicModal] = useState(false)
  const user = useSelector(state => state?.authReducer?.user?.[0])
  const handelDelete = async id => {
    const response = await dispatch(contentDelete(id))
    if (response?.data?.status === 200) {
      toast.success('Content deleted successfully')
      refresh()
    }
  }
  return (
    <>
      <Col lg='3' md='4' sm='6' xs='12'>
        {user?.type === 'A' ? (
          <Card>
            <CardImg top src={data?.coverImg ? data?.coverImg : img1} alt='Card cap' className='main-card' />

            <CardBody>
              <CardTitle tag='h4'>{data?.title}</CardTitle>
              <CardText>{data?.description}</CardText>
              <Button color='primary' tag={Link} to={to}>
                <Eye size={20} />
              </Button>

              <Button color='primary' className='ms-2' tag={Link} to={edit}>
                <Edit size={20} />
              </Button>
              <Button color='primary' className='ms-2' onClick={() => handelDelete(data?._id)}>
                <Trash2 size={20} />
              </Button>
            </CardBody>
          </Card>
        ) : (
          <Card onClick={() => setBasicModal(!basicModal)} className='cursor-pointer'>
            <CardImg top src={data?.coverImg ? data?.coverImg : img1} alt='Card cap' className='main-card' />

            <img src={playBtn} alt='logo' class='img-fluid play-btn' />

            <CardBody className='pb-0 pt-1'>
              <CardTitle tag='h6' className='mb-0'>
                {data?.title}
              </CardTitle>
            </CardBody>
          </Card>
        )}
      </Col>
      <Modal
        isOpen={basicModal}
        toggle={() => setBasicModal(!basicModal)}
        className={'modal-dialog-centered modal-fullscreen'}
      >
        <ModalHeader toggle={() => setBasicModal(!basicModal)}>{data?.title} </ModalHeader>
        <ModalBody>
          <iframe src={data?.filePath} title='content' frameborder='0' width='100%' height='100%'></iframe>
        </ModalBody>
      </Modal>
    </>
  )
}

export default CardTitles
