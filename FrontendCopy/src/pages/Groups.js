import React from 'react'
import { useSelector } from 'react-redux'

const Groups = () => {

    const {code} = useSelector((state) => state);

  return (
    <div>
      <h1>Groups</h1>
      CODE = {code}
      
    </div>
  )
}

export default Groups
