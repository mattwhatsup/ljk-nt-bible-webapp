import { Box, Button, VStack } from '@chakra-ui/react'
import React from 'react'

type Props = {}

export default function Sidebar({}: Props) {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      h="100vh"
      w="250px"
      bg="gray.200"
      p="4"
    >
      <VStack align="stretch">
        <Button colorScheme="blue">Button 1</Button>
        <Button colorScheme="blue">Button 2</Button>
        <Button colorScheme="blue">Button 3</Button>
      </VStack>
    </Box>
  )
}
