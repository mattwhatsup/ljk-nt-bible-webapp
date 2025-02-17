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
import { CgReadme } from 'react-icons/cg'
import { GoInfo } from 'react-icons/go'
import { BsAt } from 'react-icons/bs'
import { FiImage } from 'react-icons/fi'

const MenuItems = ({ children }: { children: React.ReactNode }) => (
  <Box mt={{ base: 4, md: 0 }} mr={2} display="block">
    {children}
  </Box>
)

const ResponsiveMenu = () => {
  const [open, setOpen] = useState(false)

  return (
    <Box
      display={'flex'}
      width={'full'}
      bg={'teal.500'}
      justifyContent={'center'}
      position={'fixed'}
      zIndex={100}
    >
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        color="white"
        width={'2xl'}
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
              padding={'1.2rem'}
            >
              <IconButton
                variant="outline"
                aria-label="Open Menu"
                color={'white'}
              >
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
          py="1.2rem"
        >
          <MenuItems>
            <IconButton
              colorScheme={'purple'}
              px={'1em'}
              color={'white'}
              bg={'transparent'}
              aria-pressed={true}
              _active={{ bg: 'teal.600' }}
              _hover={{ bg: 'teal.600' }}
              variant={'outline'}
            >
              <CgReadme /> 阅读
            </IconButton>
          </MenuItems>
          <MenuItems>
            <IconButton px={'1em'} color={'white'} bg={'transparent'}>
              <GoInfo /> 关于
            </IconButton>
          </MenuItems>
          <MenuItems>
            <IconButton px={'1em'} color={'white'} bg={'transparent'}>
              <BsAt /> 引用
            </IconButton>
          </MenuItems>

          <MenuItems>
            <IconButton px={'1em'} color={'white'} bg={'transparent'}>
              <FiImage /> 插图
            </IconButton>
          </MenuItems>
        </Box>
      </Flex>
    </Box>
  )
}

export default ResponsiveMenu
