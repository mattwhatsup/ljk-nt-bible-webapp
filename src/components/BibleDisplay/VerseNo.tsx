type Props = {
  verseNo: string
  verse?: string
  selected: boolean
}

export default function VerseNo({ verseNo, verse, selected }: Props) {
  return (
    <span className={selected ? 'selected' : ''}>
      <sup data-verse={verse} className={`verse-no `}>
        {verseNo}
      </sup>
    </span>
  )
}
