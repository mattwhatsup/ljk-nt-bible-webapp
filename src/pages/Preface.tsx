import { fetchContent } from '@/features/book/bookApi'
import { useLanguage, useTextSize } from '@/features/settings/settingsSlice'
import { SkeletonText, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type Props = {}

export default function Preface({}: Props) {
  const [content, setContent] = useState<string | null>(null)
  const lang = useLanguage()
  useEffect(() => {
    fetchContent(lang, 'preface').then(content => setContent(content))
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
  return (
    <>
      <VStack gap={6} className="content-display">
        {content ? (
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        ) : (
          skeletons
        )}
      </VStack>
      <style>{`
        .content-display {font-size: ${useTextSize()}px;}
      `}</style>
    </>
  )
}
