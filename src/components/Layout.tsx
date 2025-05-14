import { Box, Container, HStack, Separator, Text } from '@chakra-ui/react'
import BookNav from './BookNav'
import { useT } from '@/features/settings/settingsSlice'

interface LayoutProps {
  children?: React.ReactNode
  forBook?: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, forBook }) => {
  return (
    <>
      {forBook && <BookNav />}
      <Container maxW="2xl" px={0} pt={20 + (forBook ? 20 : 0)}>
        <Box as="main" py={4}>
          <Box
            // borderWidth="1px"
            borderRadius="lg"
            {...({
              maxContentDown: { padding: '1rem 2rem' }, // maxContent是自己定义的，在provider.tsx中
              maxContent: { padding: '1rem' },
            } as any)}
            borderWidth={{ base: '1px', maxContentDown: '0' }} // 响应式布局
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
              '© 2025 新约圣经梁家铿译本 WebApp',
              '© 2025 新約聖經梁家鏗譯本 WebApp',
            ])}
          </Text>
        </Box>

        <HStack
          {...{
            maxContentDown: { display: 'flex', padding: '1rem' }, // maxContent是自己定义的，在provider.tsx中
            maxContent: { display: 'none' },
          }}
        >
          <Separator flex="1" />
          <Text flexShrink="0">
            {useT([
              '© 2025 新约圣经梁家铿译本 WebApp',
              '© 2025 新約聖經梁家鏗譯本 WebApp',
            ])}
          </Text>
          <Separator flex="1" />
        </HStack>
      </Container>
    </>
  )
}

export default Layout
