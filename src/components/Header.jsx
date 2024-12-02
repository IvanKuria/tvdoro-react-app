import React from 'react'
import "../index.css"
import Settings from './Settings'

function Header() {
  return (
    <>
        <div className="header-container">
            <h1 className="header">TikTokdoro</h1>
            <Settings />
        </div>
        
    </>
  )
}

export default Header