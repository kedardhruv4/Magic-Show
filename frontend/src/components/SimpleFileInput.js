import React from 'react'
import { Controller } from 'react-hook-form'
import { FormFeedback, Input, Label } from 'reactstrap'

const SimpleFileInput = props => {
  const { control, name, label, id, className, error, accept } = props

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
          <input
            type='file'
            accept={accept}
            onChange={e => onChange([e.currentTarget.files[0]])}
            name={name}
            id={id}
            className={className}
            key={name + 3}
          />
        )}
      />
      {error && <FormFeedback>{error}</FormFeedback>}
    </>
  )
}

export default SimpleFileInput
