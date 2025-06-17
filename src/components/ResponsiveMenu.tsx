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
import { GoGear, GoSearch } from 'react-icons/go'
import { ImCommand, ImCtrl } from 'react-icons/im'
import { useAppDispatch } from '@/app/hooks'
import { openJumpToDialog } from '@/features/status/statusSlice'
import {
  useColorPalette,
  useT,
  useUiSizeClassName,
} from '@/features/settings/settingsSlice'
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom'
import Logo from '@/logo-title.svg?react'
import { RiArchiveDrawerLine } from 'react-icons/ri'
import { MdOutlineInfo } from 'react-icons/md'

const MenuItem = ({ children }: { children: React.ReactNode }) => (
  <Box display="block">{children}</Box>
)

const ResponsiveMenu = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const isReadingActive = useMatch('/book/*') !== null
  const isInfoActive = useMatch('/info/*') !== null
  const isLogsActive = useMatch('/logs/*') !== null

  console.log({
    isReadingActive,
    isInfoActive,
    isLogsActive,
  })

  const jumpToButton = (
    <>
      <Button
        // @ts-ignore
        display={{ maxContentDown: 'none', base: 'inline-flex' }} // 响应式布局
        colorPalette={useColorPalette()}
        color={'white'}
        _hover={{ color: `${useColorPalette()}.700` }}
        variant={'outline'}
        size={'xs'}
        // @ts-ignore
        fontSize={useUiSizeClassName('xs', 'button')}
        onClick={() => dispatch(openJumpToDialog())}
      >
        <Icon>
          <GoSearch />
        </Icon>
        {useT(['跳转', '跳轉'])}
        <Kbd>
          {/win/i.test(navigator.userAgent) ? <ImCtrl /> : <ImCommand />}J
        </Kbd>
      </Button>
      <IconButton
        aria-label="jump to"
        display={{ base: 'none', ...{ maxContentDown: 'inline-flex' } }} // 响应式布局
        size={'sm'}
        variant={'ghost'}
        color={'white'}
        _hover={{ color: `${useColorPalette()}.700` }}
        onClick={() => dispatch(openJumpToDialog())}
      >
        <GoSearch />
      </IconButton>
    </>
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

  const drawer = (
    <DrawerRoot
      open={open}
      onOpenChange={e => setOpen(e.open)}
      placement={'top'}
    >
      <DrawerBackdrop />
      <HStack
        justifyContent={'space-between'}
        width={'full'}
        display={{ ...{ base: 'flex', maxContent: 'none' } }} // 响应式布局
        // hideBelow={'maxContent'}
      >
        <Box>
          <Link to="/">
            <Logo
              className="logo"
              width="157px"
              height="54px"
              viewBox="0 0 157 54"
            />
          </Link>
        </Box>
        <HStack paddingRight={'1.2rem'}>
          {settingButton}
          {jumpToButton}
          <DrawerTrigger asChild>
            <Box
              display={{ base: 'block', ...{ maxContent: 'none' } }} // 响应式布局
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
        </HStack>
      </HStack>
      <DrawerContent
        animationDuration={'0.1s'}
        colorPalette={useColorPalette()}
      >
        <DrawerHeader>
          <DrawerTitle fontSize={useUiSizeClassName('md', 'text')}>
            {useT(['请选择...', '請選擇...'])}
          </DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Stack>
            <Button
              w="100%"
              // @ts-ignore
              fontSize={useUiSizeClassName('md', 'button')}
              onClick={() => {
                navigate('/')
                setOpen(false)
              }}
              variant={isReadingActive ? 'solid' : 'surface'}
            >
              {useT(['阅读', '閱讀'])}
            </Button>
            <Button
              w="100%"
              // @ts-ignore
              fontSize={useUiSizeClassName('md', 'button')}
              onClick={() => {
                navigate('/info')
                setOpen(false)
              }}
              variant={isInfoActive ? 'solid' : 'surface'}
            >
              {useT(['资料', '資訊'])}
            </Button>
            <Button
              w="100%"
              // @ts-ignore
              fontSize={useUiSizeClassName('md', 'button')}
              onClick={() => {
                navigate('/logs')
                setOpen(false)
              }}
              variant={isLogsActive ? 'solid' : 'surface'}
            >
              {useT(['更新记录', '更新記錄'])}
            </Button>
          </Stack>
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  )

  const menu = (
    <HStack paddingLeft={'0.2rem'}>
      <Link to="/">
        <Logo
          className="logo"
          width="157px"
          height="54px"
          viewBox="0 0 157 54"
        />
      </Link>
      <MenuItem>
        <IconButton
          colorScheme={useColorPalette()}
          px={'1em'}
          color={'white'}
          bg={'transparent'}
          aria-pressed={true}
          _active={{ bg: `${useColorPalette()}.600` }}
          _hover={{ bg: `${useColorPalette()}.600` }}
          paddingX={'0.7em'}
          variant={isReadingActive ? 'outline' : 'ghost'}
          // @ts-ignore
          fontSize={useUiSizeClassName('sm', 'button')}
          onClick={() => {
            navigate('/')
          }}
        >
          <CgReadme /> {useT(['阅读', '閱讀'])}
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton
          px={'1em'}
          color={'white'}
          bg={'transparent'}
          _active={{ bg: `${useColorPalette()}.600` }}
          _hover={{ bg: `${useColorPalette()}.600` }}
          paddingX={'0.7em'}
          variant={isInfoActive ? 'outline' : 'ghost'}
          // @ts-ignore
          fontSize={useUiSizeClassName('sm', 'button')}
          onClick={() => {
            navigate('/info')
          }}
        >
          <MdOutlineInfo /> {useT(['资料', '資訊'])}
        </IconButton>
      </MenuItem>

      <MenuItem>
        <IconButton
          px={'1em'}
          color={'white'}
          bg={'transparent'}
          _active={{ bg: `${useColorPalette()}.600` }}
          _hover={{ bg: `${useColorPalette()}.600` }}
          paddingX={'0.7em'}
          variant={isLogsActive ? 'outline' : 'ghost'}
          // @ts-ignore
          fontSize={useUiSizeClassName('sm', 'button')}
          onClick={() => {
            navigate('/logs')
          }}
        >
          <RiArchiveDrawerLine /> {useT(['更新记录', '更新記錄'])}
        </IconButton>
      </MenuItem>
    </HStack>
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
        {/* 小屏幕时 */}
        {drawer}
        {/* 大屏时 */}
        <Box
          display={{ base: 'none', ...{ maxContent: 'flex' } }} // 响应式布局
          width={{ md: 'auto' }}
          alignItems="center"
          justifyContent={'space-between'}
          flexGrow={1}
          py="1.2rem"
        >
          {menu}
          <HStack paddingRight={'0.2rem'} gap={'4px'}>
            {settingButton}
            {jumpToButton}
          </HStack>
        </Box>
      </Flex>
    </Box>
  )
}

export default ResponsiveMenu
