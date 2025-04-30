import { useLocation, useNavigate } from 'react-router-dom'
import {
  CloseButton,
  Dialog,
  Heading,
  Portal,
  Separator,
} from '@chakra-ui/react'
import { Field, Input, Stack, Switch } from '@chakra-ui/react'
import type { TextSize, UiSize } from '@/features/settings/settingsSlice'
import {
  setAfterNavigateKeepSelection,
  setColorPalette,
  setJumpToSelect,
  setLanguage,
  setShowComments,
  setTextSize,
  setUiSize,
  useAfterNavigateKeepSelection,
  useColorPalette,
  useJumpToSelect,
  useLanguage,
  useShowComments,
  useT,
  useTextSize,
  useUiSize,
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
    // itemToString: item =>
    //   `<span style='color: ${item.value}'>■</span> ${item.label}`,
    // itemToValue: item => item.value,
  })
  const colorPalette = useColorPalette()

  const textSizes = createListCollection({
    items: [...Array(11)].map((_, index) => ({
      label: `${index * 2 + 10}`,
      value: `${index * 2 + 10}`,
    })),
  })

  const uiSizes = createListCollection({
    items: [
      {
        label: '正常',
        value: '0',
      },
      {
        label: '加大',
        value: '1',
      },
      {
        label: '超大',
        value: '2',
      },
      {
        label: '更大',
        value: '3',
      },
    ],
  })
  const language = useLanguage()

  return (
    <Stack gap="8" css={{ '--field-label-width': '200px' }}>
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
                {colorPalettes.items.map(item => (
                  <Select.Item item={item} key={item.value}>
                    <span>
                      <span style={{ color: item.value }}>■</span> {item.label}
                    </span>
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

      {/* 经文字体大小 */}
      <Field.Root orientation="horizontal">
        <Field.Label>{useT(['经文字体大小', '經文字體大小'])}</Field.Label>
        <Select.Root
          collection={textSizes}
          size="sm"
          positioning={{ sameWidth: true }}
          defaultValue={[useTextSize() + '']}
          onValueChange={value => {
            dispatch(setTextSize(+value.value[0] as TextSize))
          }}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText
                placeholder={useT(['选择经文字体大小', '選擇經文字體大小'])}
              />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content zIndex={10000}>
                {textSizes.items.map(item => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Field.Root>

      {/* 界面文字大小 */}
      <Field.Root orientation="horizontal">
        <Field.Label>{useT(['界面文字大小', '界面文字大小'])}</Field.Label>
        <Select.Root
          collection={uiSizes}
          size="sm"
          positioning={{ sameWidth: true }}
          defaultValue={[useUiSize() + '']}
          onValueChange={value => {
            dispatch(setUiSize(+value.value[0] as UiSize))
          }}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder={useT(['选择...', '選擇...'])} />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content zIndex={10000}>
                {uiSizes.items.map(item => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
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
          colorPalette={useColorPalette()}
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
          colorPalette={useColorPalette()}
          defaultChecked={useJumpToSelect()}
          onCheckedChange={({ checked }) => {
            dispatch(setJumpToSelect(checked))
          }}
        >
          <Switch.HiddenInput />
          <Switch.Control />
        </Switch.Root>
      </Field.Root>

      {/* 保持选中经文 */}
      <Field.Root orientation="horizontal">
        <Field.Label>{useT(['保持选中经文', '保持選中經文'])}</Field.Label>
        <Switch.Root
          colorPalette={useColorPalette()}
          defaultChecked={useAfterNavigateKeepSelection()}
          onCheckedChange={({ checked }) => {
            dispatch(setAfterNavigateKeepSelection(checked))
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
  const title = useT(['设置', '設置'])

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
              <Dialog.Header>
                <Dialog.Title fontSize={'3xl'}>{title}</Dialog.Title>
              </Dialog.Header>
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
