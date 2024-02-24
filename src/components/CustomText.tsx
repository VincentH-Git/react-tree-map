import React, { ReactNode } from 'react'
import '../css/CustomText.css'

type Props = {
    style?:  React.CSSProperties 
    children: React.ReactNode
}

const CustomText:  React.FC<Props> = (props) => {
  return (
    <div className= "textDecoration" style={props.style}>{props.children}</div>
  )
}

export default CustomText