import React from 'react'
import { Controller } from 'react-hook-form'
import { FormFeedback, Input, Label } from 'reactstrap'

const TextInput = props => {
  const { control, name, label, type, id, placeholder, autoFocus, className, error } = props

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
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            type={type}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
            id={id}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className={className}
            key={name + 3}
            invalid={Boolean(error)}
          />
        )}
      />
      {error && <FormFeedback>{error}</FormFeedback>}
    </>
  )
}

export default TextInput
