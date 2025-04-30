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
import { GoGear, GoInfo, GoSearch } from 'react-icons/go'
import { BsAt } from 'react-icons/bs'
import { FiImage } from 'react-icons/fi'
import { ImCommand, ImCtrl } from 'react-icons/im'
import { useAppDispatch } from '@/app/hooks'
import { openJumpToDialog } from '@/features/status/statusSlice'
import { useColorPalette, useT } from '@/features/settings/settingsSlice'
import { useLocation, useNavigate } from 'react-router-dom'

const MenuItem = ({ children }: { children: React.ReactNode }) => (
  <Box display="block">{children}</Box>
)

const ResponsiveMenu = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const jumpToButton = (
    <Button
      display={'inline-flex'}
      colorPalette={useColorPalette()}
      color={'white'}
      _hover={{ color: `${useColorPalette()}.700` }}
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

  const settingButton = (
    <IconButton
      aria-label="settings"
      size={'sm'}
      variant={'ghost'}
      color={'white'}
      _hover={{ color: `${useColorPalette()}.700` }}
      onClick={() => {
        if (location.pathname !== '/settings') {
          if (window.innerWidth < 768) {
            navigate('/settings')
          } else {
            navigate('/settings', {
              state: { backgroundLocation: location },
            })
          }
        }
      }}
    >
      <GoGear />
    </IconButton>
  )

  return (
    <Box
      display={'flex'}
      width={'full'}
      bg={`${useColorPalette()}.500`}
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
            <HStack paddingRight={'1.2rem'}>
              {settingButton}
              {jumpToButton}
            </HStack>
          </HStack>
          <DrawerContent
            animationDuration={'0.1s'}
            colorPalette={useColorPalette()}
          >
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
          <HStack paddingLeft={'0.2rem'}>
            <MenuItem>
              <IconButton
                colorScheme={useColorPalette()}
                px={'1em'}
                color={'white'}
                bg={'transparent'}
                aria-pressed={true}
                _active={{ bg: `${useColorPalette()}.600` }}
                _hover={{ bg: `${useColorPalette()}.600` }}
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
          <HStack paddingRight={'0.2rem'}>
            {settingButton}
            {jumpToButton}
          </HStack>
        </Box>
      </Flex>
    </Box>
  )
}

export default ResponsiveMenu
