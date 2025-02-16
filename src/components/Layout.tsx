// filepath: /Users/mattzhou/Documents/Bible/梁木老师翻译的圣经/ljk-nt-bible-webapp/src/components/Layout.tsx
import React from 'react'
import { Box, Container, Heading, Text, Stack } from '@chakra-ui/react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container maxW="2xl" px={0}>
      <Box as="header" py={4}>
        <Heading as="h1">圣经阅读 WebApp</Heading>
      </Box>
      <Box as="main" py={4}>
        {children}
      </Box>
      <Box as="footer" py={4}>
        <Text>© 2025 圣经阅读 WebApp</Text>
      </Box>
      <Stack hideFrom="md">
        <Text>This text will be hidden from the `md` breakpoint</Text>
      </Stack>
    </Container>
  )
}

export default Layout
