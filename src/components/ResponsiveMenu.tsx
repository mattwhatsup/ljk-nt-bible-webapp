import React from 'react'
import { Box, Flex, IconButton, Button, Stack } from '@chakra-ui/react'
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react'

const MenuItems = ({ children }: { children: React.ReactNode }) => (
  <Box mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Box>
)

const ResponsiveMenu = () => {
  const [open, setOpen] = useState(false)

  return (
    <Box>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="teal.500"
        color="white"
      >
        <DrawerRoot
          open={open}
          onOpenChange={e => setOpen(e.open)}
          placement={'top'}
        >
          <DrawerBackdrop />
          <DrawerTrigger asChild>
            <Box
              display={{ base: 'block', md: 'none' }}
              onClick={() => setOpen(true)}
            >
              <IconButton variant="outline" aria-label="Open Menu">
                <GiHamburgerMenu />
              </IconButton>
            </Box>
          </DrawerTrigger>
          <DrawerContent animationDuration={'0.1s'}>
            <DrawerHeader>
              <DrawerTitle>Drawer Title</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
              <Stack>
                <Button w="100%">Home</Button>
                <Button w="100%">About</Button>
                <Button w="100%">Contact</Button>
              </Stack>
            </DrawerBody>
            <DrawerCloseTrigger />
          </DrawerContent>
        </DrawerRoot>

        <Box
          display={{ base: 'none', md: 'flex' }}
          width={{ md: 'auto' }}
          alignItems="center"
          flexGrow={1}
        >
          <MenuItems>Home</MenuItems>
          <MenuItems>About</MenuItems>
          <MenuItems>Contact</MenuItems>
        </Box>
      </Flex>
    </Box>
  )
}

export default ResponsiveMenu
