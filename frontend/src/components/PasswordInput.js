import React from 'react'
import { Controller } from 'react-hook-form'
import { FormFeedback, Label } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'

const PasswordInput = props => {
  const { control, name, label, id, placeholder, autoFocus, className, error } = props
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
        render={({ field: { onChange, onBlur } }) => (
          <InputPasswordToggle
            onChange={onChange}
            onBlur={onBlur}
            name={name}
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

export default PasswordInput
