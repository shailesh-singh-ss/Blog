import React from 'react'

function Logo({width ='w-16'}) {
  return (
    <div>
      <img
        src='logo.png'
        alt='Logo' 
        className={`flex ${width}`}
      />
    </div>
  )
}

export default Logo