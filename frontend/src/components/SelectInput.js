import React from 'react'
import { Controller } from 'react-hook-form'
import { FormFeedback, Label } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

const SelectInput = props => {
  const { control, name, label, id, placeholder, className, error, options } = props

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
        render={({ field: { onChange, value } }) => (
          <>
            <Select
              theme={selectThemeColors}
              value={options?.filter(e => e.value === value)}
              onChange={e => onChange(e?.value)}
              name={name}
              id={id}
              placeholder={placeholder}
              className={className}
              classNamePrefix='select'
              defaultValue={options?.[0]}
              options={options}
              isClearable={false}
              invalid={Boolean(error)}
            />
          </>
        )}
      />
      {error && <FormFeedback>{error}</FormFeedback>}
    </>
  )
}

export default SelectInput
