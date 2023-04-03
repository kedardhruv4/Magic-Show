import React from 'react'
import { Controller } from 'react-hook-form'
import { FormFeedback, Input, Label } from 'reactstrap'

const FileInput = props => {
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
          <Input
            type='file'
            accept={accept}
            onChange={e => onChange(e?.target?.files)}
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
      {error && <FormFeedback>{error}</FormFeedback>}
    </>
  )
}

export default FileInput
