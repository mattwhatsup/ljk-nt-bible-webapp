import type { CommentListNode } from '@/scripts/includes/chapter-parser'

type Props = {
  data: CommentListNode
}

export default function CommentList({ data }: Props) {
  return (
    <ol
      dangerouslySetInnerHTML={{ __html: data.contents.join('') }}
      className="comment-list"
    ></ol>
  )
}
