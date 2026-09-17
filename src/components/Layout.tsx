import {
  Box,
  Container,
  HStack,
  VStack,
  Separator,
  Text,
} from '@chakra-ui/react'
import BookNav from './BookNav'
import { useT } from '@/features/settings/settingsSlice'
import { useEffect, useState } from 'react'
import { fetchContent } from '@/features/book/bookApi'
import type { HistoryData } from '@/scripts/includes/other-parser'

interface LayoutProps {
  children?: React.ReactNode
  forBook?: boolean
  disableFrameset?: boolean
}

const Layout: React.FC<LayoutProps> = ({
  children,
  forBook,
  disableFrameset = false,
}) => {
  const [version, setVersion] = useState<string | null>('0.0')
  useEffect(() => {
    fetchContent('cn', 'history').then(content => {
      setVersion(
        [...(content as unknown as HistoryData).Versions].reverse()[0].version,
      )
    })
  }, [])

  return (
    <>
      {forBook && <BookNav />}
      <Container maxW="2xl" px={0} pt={20 + (forBook ? 20 : 0)}>
        <Box as="main" py={4}>
          <Box
            // borderWidth="1px"
            {...(disableFrameset
              ? {
                  padding: '1rem',
                  // marginTop: '-1rem',
                }
              : ({
                  borderRadius: 'lg',
                  maxContentDown: { padding: '1rem 2rem' }, // maxContent是自己定义的，在provider.tsx中
                  maxContent: { padding: '1rem' },
                  borderWidth: { base: '1px', maxContentDown: '0' }, // 响应式布局
                } as any))}
          >
            {children}
          </Box>
        </Box>
        <Box
          as="footer"
          py={4}
          {...{
            maxContentDown: { display: 'none' }, // maxContent是自己定义的，在provider.tsx中
          }}
        >
          <Text>
            {useT([
              // `© 2025 新约圣经梁家铿译本 WebApp v${version}`,
              `《新约圣经·梁家铿译本（注释本）》@ 2026年第二版`,
              // `© 2025 新約聖經梁家鏗譯本 WebApp v${version}`,
              `《新約聖經·梁家鏗譯本（註釋本）》@ 2026年第二版`,
            ])}
          </Text>
          <Text>
            {useT([
              `版权梁家铿所有，经授权使用。`,
              `版權梁家鏗所有，經授權使用。`,
            ])}
          </Text>
        </Box>

        <VStack
          {...{
            maxContentDown: { padding: '1rem' }, // maxContent是自己定义的，在provider.tsx中
            maxContent: { display: 'none' },
          }}
        >
          <Text flexShrink="0">
            {useT([
              // `© 2025 新约圣经梁家铿译本 WebApp v${version}`,
              `《新约圣经·梁家铿译本（注释本）》@ 2026年第二版`,
              // `© 2025 新約聖經梁家鏗譯本 WebApp v${version}`,
              `《新約聖經·梁家鏗譯本（註釋本）》@ 2026年第二版`,
            ])}
          </Text>
          <Text flexShrink="0">
            {useT([
              `版权梁家铿所有，经授权使用。`,
              `版權梁家鏗所有，經授權使用。`,
            ])}
          </Text>
        </VStack>
      </Container>
    </>
  )
}

export default Layout
