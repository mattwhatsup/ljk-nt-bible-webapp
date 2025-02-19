type Props = {
  verseNo: string
}

export default function VerseNo({ verseNo }: Props) {
  return <sup>{verseNo}</sup>
}
