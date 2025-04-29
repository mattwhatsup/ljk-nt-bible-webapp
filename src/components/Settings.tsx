import { useLocation, useNavigate } from 'react-router-dom'
import {
  AspectRatio,
  Button,
  CloseButton,
  Dialog,
  Heading,
  Portal,
  Separator,
} from '@chakra-ui/react'
import { Field, Input, Stack, Switch } from '@chakra-ui/react'
import {
  setColorPalette,
  setJumpToSelect,
  setLanguage,
  setShowComments,
  useColorPalette,
  useJumpToSelect,
  useLanguage,
  useShowComments,
  useT,
} from '@/features/settings/settingsSlice'
import { Select, createListCollection } from '@chakra-ui/react'
import { useAppDispatch } from '@/app/hooks'

type Props = {}

function Content({}: Props) {
  const dispatch = useAppDispatch()
  const languages = createListCollection({
    items: [
      {
        label: useT(['简体中文', '簡體中文']),
        value: 'cn',
      },
      {
        label: useT(['繁体中文', '繁體中文']),
        value: 'tw',
      },
    ],
  })
  const colorPalettes = createListCollection({
    items: [
      {
        label: useT(['灰色', '灰色']),
        value: 'gray',
      },
      {
        label: useT(['红色', '紅色']),
        value: 'red',
      },
      {
        label: useT(['橙色', '橙色']),
        value: 'orange',
      },
      {
        label: useT(['黄色', '黃色']),
        value: 'yellow',
      },
      {
        label: useT(['绿色', '綠色']),
        value: 'green',
      },
      {
        label: useT(['蓝绿色', '藍綠色']),
        value: 'teal',
      },
      {
        label: useT(['蓝色', '藍色']),
        value: 'blue',
      },
      {
        label: useT(['青色', '青色']),
        value: 'cyan',
      },
      {
        label: useT(['紫色', '紫色']),
        value: 'purple',
      },
      {
        label: useT(['粉色', '粉色']),
        value: 'pink',
      },
    ],
  })
  const colorPalette = useColorPalette()

  const uiSizes = createListCollection({
    items: [
      {
        label: '小',
        value: 'sm',
      },
      {
        label: '中',
        value: 'md',
      },
      {
        label: '大',
        value: 'lg',
      },
      {
        label: useT(['超大', '超大']),
        value: 'xl',
      },
    ],
  })
  const language = useLanguage()

  return (
    <Stack gap="8" css={{ '--field-label-width': '200px' }}>
      <Heading size={'2xl'}>设置</Heading>
      <Separator size={'xs'} />

      {/* 色调 */}
      <Field.Root orientation="horizontal">
        <Field.Label>{useT(['色调', '色調'])}</Field.Label>
        <Select.Root
          collection={colorPalettes}
          size="sm"
          positioning={{ sameWidth: true }}
          defaultValue={[colorPalette]}
          onValueChange={value => {
            // @ts-ignore
            dispatch(setColorPalette(value.value[0]))
          }}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder={useT(['选择色调', '選擇色調'])} />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content zIndex={10000}>
                {colorPalettes.items.map(lang => (
                  <Select.Item item={lang} key={lang.value}>
                    {lang.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Field.Root>

      {/* 语言 */}
      <Field.Root orientation="horizontal">
        <Field.Label>{useT(['语言', '語言'])}</Field.Label>
        <Select.Root
          collection={languages}
          size="sm"
          positioning={{ sameWidth: true }}
          defaultValue={[language]}
          onValueChange={value => {
            dispatch(setLanguage(value.value[0] as 'cn' | 'tw'))
          }}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder={useT(['选择语言', '選擇語言'])} />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content zIndex={10000}>
                {languages.items.map(lang => (
                  <Select.Item item={lang} key={lang.value}>
                    {lang.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Field.Root>

      {/* 显示注释 */}
      <Field.Root orientation="horizontal">
        <Field.Label>{useT(['显示注释', '顯示注釋'])}</Field.Label>
        <Switch.Root
          defaultChecked={useShowComments()}
          onCheckedChange={({ checked }) => {
            dispatch(setShowComments(checked))
          }}
        >
          <Switch.HiddenInput />
          <Switch.Control />
        </Switch.Root>
      </Field.Root>

      {/* 跳转选中 */}
      <Field.Root orientation="horizontal">
        <Field.Label>
          {useT(['快速跳转后选中经文', '快速跳轉後選中經文'])}
        </Field.Label>
        <Switch.Root
          defaultChecked={useJumpToSelect()}
          onCheckedChange={({ checked }) => {
            dispatch(setJumpToSelect(checked))
          }}
        >
          <Switch.HiddenInput />
          <Switch.Control />
        </Switch.Root>
      </Field.Root>
    </Stack>
  )
}
export default function Settings({}: Props) {
  const location = useLocation()
  const state = location.state as { backgroundLocation?: Location }
  const navigate = useNavigate()

  if (!state?.backgroundLocation) {
    return <Content />
  } else {
    return (
      <Dialog.Root
        placement="top"
        defaultOpen={true}
        onExitComplete={() => {
          navigate(-1)
        }}
        restoreFocus={false}
        size={'md'}
        motionPreset={'slide-in-top'}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Body pt="4">
                <Content />
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton bg="bg" size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    )
  }
}
