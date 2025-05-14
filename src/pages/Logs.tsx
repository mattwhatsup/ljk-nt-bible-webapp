import {
  getUiSizeClassName,
  useColorPalette,
  useLanguage,
  useT,
  useUiSize,
} from '@/features/settings/settingsSlice'
import {
  Heading,
  List,
  SkeletonText,
  Text,
  Timeline,
  VStack,
} from '@chakra-ui/react'
import { LuCheck, LuPackage, LuShip } from 'react-icons/lu'
import { MdAddBox } from 'react-icons/md'
import { IoMdAdd } from 'react-icons/io'
import { RiAddLargeLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { fetchContent } from '@/features/book/bookApi'
import type { HistoryData } from '@/scripts/includes/other-parser'
import { FaWrench } from 'react-icons/fa6'

type Props = {}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}-${month}-${day}`
}
export default function Logs({}: Props) {
  const size = useUiSize()
  const [logs, setLogs] = useState<HistoryData | null>(null)
  const lang = useLanguage()
  const colorPalette = useColorPalette()
  useEffect(() => {
    fetchContent(lang, 'history').then(content => {
      // @ts-ignore
      setLogs(content)
    })
  }, [lang])

  const skeletons = (
    <>
      <SkeletonText noOfLines={5} gap={4} variant={'pulse'} />
      <SkeletonText noOfLines={2} gap={4} variant={'pulse'} />
      <SkeletonText noOfLines={7} gap={4} variant={'pulse'} />
      <SkeletonText noOfLines={3} gap={4} variant={'pulse'} />
      <SkeletonText noOfLines={4} gap={4} variant={'pulse'} />
    </>
  )

  const versions = (
    <>
      {logs?.Versions && (
        <Timeline.Root maxW="400px" size={'lg'} paddingBottom={'2em'}>
          {[...logs.Versions].reverse().map((item, index) => {
            return (
              <Timeline.Item key={item.version} colorPalette={colorPalette}>
                <Timeline.Connector>
                  <Timeline.Separator />
                  <Timeline.Indicator>
                    <RiAddLargeLine />
                  </Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                  <Timeline.Title
                    textStyle={getUiSizeClassName('md', size, 'text')}
                  >
                    {item.version}
                  </Timeline.Title>
                  <Timeline.Description
                    textStyle={getUiSizeClassName('sm', size, 'text')}
                  >
                    {formatDate(item.date)}
                  </Timeline.Description>
                  <Text textStyle={getUiSizeClassName('sm', size, 'text')}>
                    {item.description}
                    {item.changes && (
                      <List.Root
                        gap="2"
                        variant="plain"
                        align="center"
                        paddingTop={'0.75em'}
                      >
                        {item.changes.map((change, index) => {
                          return (
                            <List.Item key={index}>
                              <List.Indicator
                                asChild
                                color={`${colorPalette}.500`}
                              >
                                <FaWrench />
                              </List.Indicator>
                              {change}
                            </List.Item>
                          )
                        })}
                      </List.Root>
                    )}
                  </Text>
                </Timeline.Content>
              </Timeline.Item>
            )
          })}
        </Timeline.Root>
      )}
    </>
  )

  return (
    <VStack>
      <Heading
        fontSize={'2.2em'}
        paddingTop={'0.5em'}
        textAlign={'center'}
        paddingBottom={'1em'}
      >
        {useT(['更 新 历 史', '更 新 歷 史'])}
      </Heading>

      {logs ? versions : skeletons}
    </VStack>
  )
}
