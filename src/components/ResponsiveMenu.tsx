import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  HStack,
  Icon,
  Kbd,
} from '@chakra-ui/react'
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
import { GoInfo, GoSearch } from 'react-icons/go'
import { BsAt } from 'react-icons/bs'
import { FiImage } from 'react-icons/fi'
import { ImCommand, ImCtrl } from 'react-icons/im'
import { useAppDispatch } from '@/app/hooks'
import { openJumpToDialog } from '@/features/status/statusSlice'
import { useT } from '@/features/settings/settingsSlice'

const MenuItem = ({ children }: { children: React.ReactNode }) => (
  <Box display="block">{children}</Box>
)

const ResponsiveMenu = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const jumpToButton = (
    <Button
      display={'inline-flex'}
      colorPalette={'teal'}
      variant={'outline'}
      size={'xs'}
      onClick={() => dispatch(openJumpToDialog())}
    >
      <Icon>
        <GoSearch />
      </Icon>
      {useT(['快速跳转', '快速跳轉'])}
      <Kbd>
        {/win/i.test(navigator.userAgent) ? <ImCtrl /> : <ImCommand />}J
      </Kbd>
    </Button>
  )

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
          <HStack
            justifyContent={'space-between'}
            width={'full'}
            display={{ ...{ base: 'flex', maxContent: 'none' } }}
            // hideBelow={'maxContent'}
          >
            <DrawerTrigger asChild>
              <Box
                display={{ base: 'block', ...{ maxContent: 'none' } }}
                onClick={() => setOpen(true)}
                padding={'1.2rem'}
              >
                <IconButton
                  variant="outline"
                  aria-label={useT(['打开菜单', '打開菜單'])}
                  color={'white'}
                >
                  <GiHamburgerMenu />
                </IconButton>
              </Box>
            </DrawerTrigger>
            {jumpToButton}
          </HStack>
          <DrawerContent animationDuration={'0.1s'} colorPalette={'teal'}>
            <DrawerHeader>
              <DrawerTitle>{useT(['请选择...', '請選擇...'])}</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
              <Stack>
                <Button w="100%">{useT(['阅读', '閱讀'])}</Button>
                <Button w="100%">{useT(['关于', '關於'])}</Button>
                <Button w="100%">{useT(['插图', '插圖'])}</Button>
              </Stack>
            </DrawerBody>
            <DrawerCloseTrigger />
          </DrawerContent>
        </DrawerRoot>

        <Box
          display={{ base: 'none', ...{ maxContent: 'flex' } }}
          width={{ md: 'auto' }}
          alignItems="center"
          justifyContent={'space-between'}
          flexGrow={1}
          py="1.2rem"
        >
          <HStack>
            <MenuItem>
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
                <CgReadme /> {useT(['阅读', '閱讀'])}
              </IconButton>
            </MenuItem>
            <MenuItem>
              <IconButton px={'1em'} color={'white'} bg={'transparent'}>
                <GoInfo /> {useT(['关于', '關於'])}
              </IconButton>
            </MenuItem>
            <MenuItem>
              <IconButton px={'1em'} color={'white'} bg={'transparent'}>
                <BsAt /> {useT(['引用', '引用'])}
              </IconButton>
            </MenuItem>

            <MenuItem>
              <IconButton px={'1em'} color={'white'} bg={'transparent'}>
                <FiImage /> {useT(['插图', '插圖'])}
              </IconButton>
            </MenuItem>
          </HStack>
          {jumpToButton}
        </Box>
      </Flex>
    </Box>
  )
}

export default ResponsiveMenu
