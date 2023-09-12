import React, { useState } from 'react'
import { UniversalPicker, PickerValue } from '../lib/'

const App = () => {
  const [value, setValue] = useState<PickerValue>([1])
  return (
    <>
      <UniversalPicker
        value={value}
        mode="multiple"
        options={[
          { value: 1, label: 'Apple' },
          { value: 2, label: 'Oranges' }
        ]}
        onConfirm={(value) => {
          setValue(value)
        }}
      />
    </>
  )
}

export default App
