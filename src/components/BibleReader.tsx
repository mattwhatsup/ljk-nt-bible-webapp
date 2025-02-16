// filepath: /Users/mattzhou/Documents/Bible/梁木老师翻译的圣经/ljk-nt-bible-webapp/src/components/BibleReader.tsx
import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'

const BibleReader: React.FC = () => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Heading as="h2" size="lg" mb={4}>
        圣经章节
      </Heading>
      <Text>这里显示圣经内容...</Text>
    </Box>
  )
}

export default BibleReader
