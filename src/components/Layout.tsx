// filepath: /Users/mattzhou/Documents/Bible/梁木老师翻译的圣经/ljk-nt-bible-webapp/src/components/Layout.tsx
import { Box, Container, Heading, Text, Stack } from '@chakra-ui/react'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container maxW="2xl" px={0} pt={20}>
      <Box as="main" py={4}>
        <Box borderWidth="1px" borderRadius="lg" p={4}>
          {children}
        </Box>
      </Box>
      <Box as="footer" py={4}>
        <Text>© 2025 新约圣经梁家铿译本 WebApp</Text>
      </Box>
    </Container>
  )
}

export default Layout
