// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  ListGroup,
  ListGroupItem,
  FormFeedback,
  Label
} from 'reactstrap'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud } from 'react-feather'
import { Controller } from 'react-hook-form'

const FileUploadSingle = props => {
  const { onChange, multiple, accept } = props

  // ** State
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    multiple,
    accept,
    onDrop: acceptedFiles => {
      setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
      onChange([...files, ...acceptedFiles.map(file => Object.assign(file))])
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
    } else {
      return <FileText size='28' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
    onChange([...filtered])
  }

  const renderFileSize = size => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  const fileList = files.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>{renderFilePreview(file)}</div>
        <div>
          <p className='file-name mb-0'>{file.name}</p>
          <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))

  return (
    <Card>
      <CardBody>
        {files.length ? (
          <Fragment>
            <ListGroup className='my-2'>{fileList}</ListGroup>
          </Fragment>
        ) : (
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <div className='d-flex align-items-center justify-content-center flex-column'>
              <DownloadCloud size={64} />
              <h5>Drop Files here or click to upload</h5>
              <p className='text-secondary'>
                Drop files here or click{' '}
                <a href='/' onClick={e => e.preventDefault()}>
                  browse
                </a>{' '}
                thorough your machine
              </p>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  )
}
const FileUpload = props => {
  const { control, name, label, id, placeholder, className, error, accept } = props

  return (
    <>
      {label && (
        <Label className='form-label' for={id} key={name + 1}>
          {label}
        </Label>
      )}
      <Controller
        control={control}
        name={name}
        key={name + 2}
        render={({ field: { onChange } }) => (
          <FileUploadSingle
            accept={accept}
            onChange={e => {
              onChange(e)
            }}
            name={name}
            id={id}
            placeholder={placeholder}
            className={className}
            key={name + 3}
            invalid={Boolean(error)}
            multiple={false}
          />
        )}
      />
      {error && <span className='text-danger'>{error}</span>}
    </>
  )
}

export default FileUpload
