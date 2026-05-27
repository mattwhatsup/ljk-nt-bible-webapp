import type {
  CommentListNode,
  ULCommentListNode,
} from '@/scripts/includes/chapter-parser'

type Props = {
  data: CommentListNode | ULCommentListNode
  ul?: boolean
}

export default function CommentList({ data, ul = false }: Props) {
  return ul ? (
    <ul
      dangerouslySetInnerHTML={{ __html: data.contents.join('') }}
      className="ul-comment-list"
    ></ul>
  ) : (
    <ol
      dangerouslySetInnerHTML={{ __html: data.contents.join('') }}
      className="comment-list"
    ></ol>
  )
}
