import { Button, HStack } from '@chakra-ui/react'
import { Slider } from './components/ui/slider'

export default () => {
  return (
    <HStack>
      <Button>Click me</Button>
      <Button>Click me</Button>
      <Slider
        defaultValue={[20, 80]}
        marks={[0, 100]}
        showValue
        label="Volume"
      />
    </HStack>
  )
}
