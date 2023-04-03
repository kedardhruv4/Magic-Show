// ** Reactstrap Imports
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card, CardBody, CardText, Row, Col, Table } from 'reactstrap'
import { contentGetById } from '../../redux/action/contentAction'
const ViewSongs = () => {
  const [data, setData] = useState()
  const params = useParams()
  const dispatch = useDispatch()

  const getSongData = async id => {
    const response = await dispatch(contentGetById(id))
    if (response?.data?.status === 200) {
      setData(response?.data?.data?.[0])
    }
  }

  useEffect(() => {
    getSongData(params?.id)
  }, [params?.id])
  return (
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding pt-0'>
        <Row className='invoice-spacing'>
          <Col className='p-0 mt-xl-0 mt-2' xl='4'>
            <h6 className='mb-2 mt-2'>Song Details</h6>
            <table>
              <tbody>
                <tr>
                  <td colSpan={2}>
                    <iframe src={data?.filePath} title='content' frameborder='0' width='100%' height='100%'></iframe>
                  </td>
                </tr>
                <tr>
                  <td className='pe-1'>Title:</td>
                  <td>
                    <span className='fw-bold'>{data?.title}</span>
                  </td>
                </tr>
                <tr>
                  <td className='pe-1'>Description</td>
                  <td>{data?.description}</td>
                </tr>
                <tr>
                  <td className='pe-1'>Song Type:</td>
                  <td>{data?.isFree ? 'Free' : 'Paid'}</td>
                </tr>
                <tr>
                  <td className='pe-1'>Content:</td>
                  <td>{data?.filePath}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>

      {/* /Invoice Note */}
    </Card>
  )
}

export default ViewSongs
