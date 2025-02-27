import type { ReactNode } from 'react'
import type React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // 更新 state 以触发回退 UI
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 你可以在这里记录错误信息，例如发送到错误监控服务
    console.error('****Uncaught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义回退 UI
      return (
        <h1>
          Something went wrong. <a href={'/'}>Go Back</a>
        </h1>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
