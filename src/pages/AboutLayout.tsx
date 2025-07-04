import { useT, useUiSizeClassName } from '@/features/settings/settingsSlice'
import { Tabs } from '@chakra-ui/react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

type Props = {}

export default function AboutLayout({}: Props) {
  const location = useLocation()
  const navigate = useNavigate()

  // 根据当前路径判断激活的 tab
  const getCurrentTab = () => {
    if (location.pathname.includes('/about/logs')) {
      return 'logs'
    } else if (location.pathname.includes('/about/author-bio')) {
      return 'author-bio'
    }
    return 'preface'
  }

  return (
    <div>
      <Tabs.Root
        variant={'outline'}
        value={getCurrentTab()}
        onValueChange={({ value }) => {
          // 根据 tab 切换路由
          if (value === 'logs') {
            navigate('/about/logs')
          } else if (value === 'author-bio') {
            navigate('/about/author-bio')
          } else {
            navigate('/about/preface')
          }
        }}
        // @ts-ignore
        size={useUiSizeClassName('sm', 'control')}
      >
        <Tabs.List>
          <Tabs.Trigger value="author-bio">
            {useT(['作者简介', '作者簡介'])}
          </Tabs.Trigger>
          <Tabs.Trigger value="preface">{useT(['自序', '自序'])}</Tabs.Trigger>
          <Tabs.Trigger value="logs">
            {useT(['更新记录', '更新記錄'])}
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="author-bio"></Tabs.Content>
        <Tabs.Content value="preface"></Tabs.Content>
        <Tabs.Content value="logs"></Tabs.Content>
      </Tabs.Root>
      <Outlet />
    </div>
  )
}
