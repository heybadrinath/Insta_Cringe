import React from 'react'
import data from "../dummyData.json"
import "./firstEntity.css"

function FirstEntity() {
  return (
    <div className='dummy'>
        <h1>{data.UserName}</h1>
        <p>{data.Bio}</p>
    </div>
  )
}

export default FirstEntity