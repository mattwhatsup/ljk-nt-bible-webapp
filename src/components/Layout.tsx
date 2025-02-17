import { Box, Container, Text } from '@chakra-ui/react'

interface LayoutProps {
  children?: React.ReactNode
  forBook?: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, forBook }) => {
  return (
    <>
      <Container maxW="2xl" px={0} pt={20 + (forBook ? 20 : 0)}>
        <Box as="main" py={4}>
          <Box borderWidth="1px" borderRadius="lg" p={4}>
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
