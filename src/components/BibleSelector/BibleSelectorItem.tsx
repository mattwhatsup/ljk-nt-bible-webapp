import type { FunctionComponent, MouseEvent } from 'react'

interface BibleSelectorItemProps {
  label: string | number
  active: boolean
  onClick: (event: MouseEvent<HTMLElement>) => void
}

const BibleSelectorItem: FunctionComponent<BibleSelectorItemProps> = ({
  label,
  active,
  onClick,
}) => {
  return (
    <li
      className={`hover:bg-gray-50 ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <span>{label}</span>
    </li>
  )
}

export default BibleSelectorItem
