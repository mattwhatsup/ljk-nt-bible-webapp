type Props = {
  verseNo: string
  verse?: string
}

export default function VerseNo({ verseNo, verse }: Props) {
  return (
    <sup data-verse={verse} className="verse-no">
      {verseNo}
    </sup>
  )
}
