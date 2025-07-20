import JumpToDialog from '@/components/JumpToDialog/JumpToDialog'
import Layout from '@/components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

type Props = {}

export default function FrontPage({}: Props) {
  const [flipping, setFlipping] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => {
    setFlipping(true)
    setTimeout(() => {
      navigate('/book/mt/1')
    }, 900) // 动画时长与CSS一致
  }

  return (
    <Layout forBook disableFrameset={true}>
      <div className="book-flip-parent">
        <img
          src="https://static.wixstatic.com/media/618103_413a40fd49704799aebd381a434eafd4~mv2.jpg"
          alt="front page"
          className={flipping ? 'book-flip' : ''}
          style={{
            borderRadius: '0.4rem',
          }}
          onClick={handleClick}
        />
      </div>
      <JumpToDialog />
    </Layout>
  )
}
