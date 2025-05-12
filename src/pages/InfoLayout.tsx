import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

export default function InfoLayout({}: Props) {
  return (
    <div>
      InfoLayout
      <Outlet />
    </div>
  )
}
