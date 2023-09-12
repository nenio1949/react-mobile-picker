import React from 'react'
import Picker from 'react-mobile-universal-picker'

const App = () => {
  return (
    <>
      <Picker
        value={1}
        options={[
          { value: 1, label: '哈哈哈1' },
          { value: 2, label: '哈哈哈2' }
        ]}
      />
    </>
  )
}

export default App
