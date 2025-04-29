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
import { useT } from '@/features/settings/settingsSlice'
import { Select, createListCollection } from '@chakra-ui/react'

type Props = {}

function Content({}: Props) {
  const languages = createListCollection({
    items: [
      {
        label: '简体中文',
        value: 'cn',
      },
      {
        label: '繁体中文',
        value: 'tw',
      },
    ],
  })
  const themes = createListCollection({
    items: [
      {
        label: '浅色',
        value: 'light',
      },
      {
        label: '深色',
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
        label: '特大',
        value: 'xl',
      },
    ],
  })

  return (
    <Stack gap="2" css={{ '--field-label-width': '96px' }}>
      <Heading size={'2xl'}>设置</Heading>
      <Separator marginBottom={'4'} size={'xs'} />
      <Field.Root orientation="horizontal">
        <Field.Label>{useT(['语言', '語言'])}</Field.Label>
        <Select.Root
          collection={languages}
          size="sm"
          positioning={{ sameWidth: true, overlap: true }}
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
        <Field.Label>Email</Field.Label>
        <Input placeholder="me@example.com" flex="1" />
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
