import React from 'react'
import { Outlet, useParams } from 'react-router-dom'

type Props = {}

export default function Book({}: Props) {
  const { book, chapter } = useParams<{ book: string; chapter?: string }>()

  return (
    <div>
      <h1>
        Book: {book} : {chapter}
      </h1>
      {chapter ? (
        <Outlet />
      ) : (
        <div>
          <h2>Please select a chapter</h2>
          {/* 这里可以添加默认内容 */}
        </div>
      )}
    </div>
  )
}
