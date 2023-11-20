import * as React from 'react'
import { usePinInput } from 'react-pin-input-hook'

function Verification({values, setValues}) {
  const { fields } = usePinInput({
    values,
      onChange: (values) => {
      setValues(values)
    },
  })

  return (
    <div className='pin-input verification-block'>
      {fields.map((propsField, index) => (
        <input key={index} className='pin-input__field verification-input'  {...propsField} />
      ))}
    </div>
  )
}

export default Verification;