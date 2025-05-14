import { useT } from '@/features/settings/settingsSlice'
import { Tabs } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

type Props = {}

export default function InfoLayout({}: Props) {
  const location = useLocation()
  const navigate = useNavigate()

  // 根据当前路径判断激活的 tab
  const getCurrentTab = () => {
    if (location.pathname.includes('/info/bibliography')) {
      return 'bibliography'
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
          if (value === 'bibliography') {
            navigate('/info/bibliography')
          } else {
            navigate('/info/preface')
          }
        }}
      >
        <Tabs.List>
          <Tabs.Trigger value="preface">{useT(['自序', '自序'])}</Tabs.Trigger>
          <Tabs.Trigger value="bibliography">
            {useT(['引用书目', '引用書目'])}
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="preface"></Tabs.Content>
        <Tabs.Content value="bibliography"></Tabs.Content>
      </Tabs.Root>
      <Outlet />
    </div>
  )
}
