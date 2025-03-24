import { Box, Container, Text } from '@chakra-ui/react'
import BookNav from './BookNav'

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
            borderWidth={{ base: '1px', maxContentDown: '0' }}
          >
            {children}
          </Box>
        </Box>
        <Box as="footer" py={4}>
          <Text>© 2025 新约圣经梁家铿译本 WebApp</Text>
        </Box>
      </Container>
    </>
  )
}

export default Layout
