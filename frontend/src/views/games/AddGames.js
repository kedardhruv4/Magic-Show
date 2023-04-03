// ** Reactstrap Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardBody, Col, Form, Button, Label, Row, Spinner } from 'reactstrap'
import SelectInput from '../../components/SelectInput'
import SimpleFileInput from '../../components/SimpleFileInput'
import TextInput from '../../components/TextInput'
import { contentOptions } from '../../constants/constants'
import { movieEditSchema, movieSchema } from '../../constants/validattion'
import { contentAdd, contentGetById, contentUpdate, coverImageUpload } from '../../redux/action/contentAction'

const AddGames = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loding, setLoding] = useState(false)
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const defaultValues = {
    file: [],
    title: '',
    description: '',
    isFree: 'true',
    cover: []
  }
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(params?.id ? movieEditSchema : movieSchema)
  })

  const onSubmit = async data => {
    setLoding(true)
    const formData = new FormData()
    formData.append('files', data?.file?.[0])
    formData.append('isFree', data?.isFree)
    formData.append('title', data?.title)
    formData.append('description', data?.description)
    formData.append('type', 'games')

    if (isEdit) {
      const finalData = {
        title: data?.title,
        description: data?.description,
        isFree: data?.isFree
      }
      const response = await dispatch(contentUpdate(params?.id, finalData))

      if (response?.data?.status === 200) {
        toast.success('Games updated successfully')
        navigate('/games')
      }
    } else {
      const response = await dispatch(contentAdd(formData))

      if (response?.data?.status === 200) {
        if (data?.cover?.[0]) {
          const coverFormData = new FormData()
          coverFormData.append('id', response?.data?.data?._id)
          coverFormData.append('files', data?.cover?.[0])

          const coverResponse = await dispatch(coverImageUpload(coverFormData))
          if (coverResponse?.data?.status === 200) {
            toast.success('Games added successfully')
            navigate('/games')
          }
        }
        toast.success('Games added successfully')
        navigate('/games')
      }
    }
    setLoding(true)
  }
  const getGameData = async id => {
    const response = await dispatch(contentGetById(id))
    if (response?.data?.status === 200) {
      reset({ ...response?.data?.data?.[0] })
    }
  }

  useEffect(() => {
    if (params?.id) {
      setIsEdit(true)
      getGameData(params?.id)
    }
  }, [params?.id])
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>{params?.id ? 'Edit Game' : 'Add Game'}</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {params?.id ? null : (
            <>
              <Row className='mb-1'>
                <Label sm='3' for='inputFile'>
                  Cover Image
                </Label>
                <Col sm='9'>
                  <SimpleFileInput
                    control={control}
                    name='cover'
                    label=''
                    type='file'
                    id='song-file'
                    placeholder='Add file here'
                    autoFocus={false}
                    accept='image/*'
                    className=''
                    error={errors?.file?.message}
                  />
                </Col>
              </Row>
              <Row className='mb-1'>
                <Label sm='3' for='inputFile'>
                  File
                </Label>
                <Col sm='9'>
                  <SimpleFileInput
                    control={control}
                    name='file'
                    label=''
                    type='file'
                    id='song-file'
                    placeholder='Add file here'
                    autoFocus={false}
                    accept='video/mp4'
                    className=''
                    error={errors?.file?.message}
                  />
                </Col>
              </Row>
            </>
          )}

          <Row className='mb-1'>
            <Label sm='3' for='movie-description'>
              Title
            </Label>
            <Col sm='9'>
              <TextInput
                control={control}
                name='title'
                label=''
                type='text'
                id='movie-title'
                placeholder='Add title here'
                autoFocus={true}
                className=''
                error={errors?.title?.message}
              />
            </Col>
          </Row>

          <Row className='mb-1'>
            <Label sm='3' for='movie-description'>
              Description
            </Label>
            <Col sm='9'>
              <TextInput
                control={control}
                name='description'
                label=''
                type='description'
                id='movie-description'
                placeholder='Add description here'
                autoFocus={false}
                className=''
                error={errors?.description?.message}
              />
            </Col>
          </Row>
          <Row className='mb-1'>
            <Label sm='3' for='movie-description'>
              Games type
            </Label>
            <Col sm='9'>
              <SelectInput
                control={control}
                name='isFree'
                label=''
                id='movie-isFree'
                placeholder='Select type'
                autoFocus={true}
                className='react-select'
                options={contentOptions}
                error={errors?.isFree?.message}
              />
            </Col>
          </Row>
          <Row>
            <Col className='d-flex' md={{ size: 9, offset: 3 }}>
              <Button className='me-1' color='primary' type='submit' disabled={loding}>
                Submit
                {loding ? (
                  <>
                    &nbsp;
                    <Spinner color='light' size='sm' />
                  </>
                ) : null}
              </Button>
              {params?.id ? null : (
                <Button outline color='secondary' type='reset' disabled={loding}>
                  Reset
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}
export default AddGames
