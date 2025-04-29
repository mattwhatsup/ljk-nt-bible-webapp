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
  setLanguage,
  setShowComments,
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
  const themes = createListCollection({
    items: [
      {
        label: useT(['浅色', '淺色']),
        value: 'light',
      },
      {
        label: useT(['深色', '深色']),
        value: 'dark',
      },
    ],
  })
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
    <Stack gap="4" css={{ '--field-label-width': '96px' }}>
      <Heading size={'2xl'}>设置</Heading>
      <Separator marginBottom={'4'} size={'xs'} />
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
              <Select.ValueText placeholder="Select framework" />
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

      <Field.Root orientation="horizontal">
        <Field.Label>Hide email</Field.Label>
        <Switch.Root>
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
