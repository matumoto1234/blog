import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronIconProps,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisIcon,
} from '../Icon'
import { HStack } from '../Stack'
import {
  paginationButton,
  paginationButtonSelected,
  paginationButtonDisabled,
  paginationButtonEllipsis,
} from './index.css'

// 実質的なenum
const PaginationButtonState = {
  Disable: 'disable',
  Ellipsis: 'ellipsis',
  Selected: 'selected',
  Normal: 'normal',
} as const

type PaginationButtonState =
  typeof PaginationButtonState[keyof typeof PaginationButtonState]

const PaginationButton: React.FC<{
  children: ReactNode
  state: PaginationButtonState
  linkToPage: number
  onPageChange: (page: number) => void
  myKey?: React.Key
}> = ({ children, state, linkToPage, onPageChange, myKey }) => {
  switch (state) {
    case PaginationButtonState.Disable:
      return <div className={paginationButtonDisabled}>{children}</div>

    case PaginationButtonState.Ellipsis:
      return (
        <div className={paginationButtonEllipsis}>
          <EllipsisIcon />
        </div>
      )

    case PaginationButtonState.Selected:
      return <div className={paginationButtonSelected}>{children}</div>

    case PaginationButtonState.Normal:
    default:
      return (
        <Link
          to={`?page=${linkToPage}`}
          key={myKey}
          onClick={() => onPageChange(linkToPage)}
        >
          <div className={paginationButton}>{children}</div>
        </Link>
      )
  }
}

const createPageList = (
  current: number,
  pageCount: number,
  buttonCount: number
): string[] => {
  // 全ページ表示
  if (pageCount <= buttonCount) {
    return new Array(pageCount).fill(0).map((_, i) => (i + 1).toString())
  }

  // 1~ceil(buttonCount/2)までの個数(ceil(buttonCount/2))分、すべて表示できる場合
  if (current <= Math.ceil(buttonCount / 2)) {
    return [
      ...new Array(buttonCount - 2).fill(0).map((_, i) => (i + 1).toString()),
      '.',
      pageCount.toString(),
    ]
  }

  // ceil(buttonCount/2)~pageCountまでの個数(pageCount - ceil(buttonCount/2) + 1)分、すべて表示できる場合
  if (current > pageCount - Math.ceil(buttonCount / 2)) {
    return [
      '1',
      '.',
      ...new Array(buttonCount - 2)
        .fill(0)
        .map((_, i) => (pageCount - (buttonCount - 2 - 1) + i).toString()),
    ]
  }

  // 両側ともすべて表示できない場合
  return [
    '1',
    '.',
    ...new Array(buttonCount - 4)
      .fill(0)
      .map((_, i) => (current - (buttonCount - 4 - 1) / 2 + i).toString()),
    '.',
    pageCount.toString(),
  ]
}

const toState = ({
  disable = false,
  ellipsis = false,
  selected = false,
}): PaginationButtonState => {
  if (disable) {
    return PaginationButtonState.Disable
  }
  if (ellipsis) {
    return PaginationButtonState.Ellipsis
  }
  if (selected) {
    return PaginationButtonState.Selected
  }
  return PaginationButtonState.Normal
}

export const Pagination: React.FC<{
  current: number // 1-indexed
  pageCount: number
  buttonCount: number
  onPageChange: (page: number /* 0-indexed */) => void
}> = ({ current, pageCount, buttonCount, onPageChange }) => {
  const pageList = createPageList(current, pageCount, buttonCount)

  const isFirstPage = current === 1
  const isLastPage = current === pageCount

  return (
    <HStack style={{ gap: 24 }}>
      <PaginationButton
        state={toState({ disable: isFirstPage })}
        linkToPage={current - 1}
        onPageChange={onPageChange}
      >
        <ChevronLeftIcon disable={isFirstPage} />
      </PaginationButton>
      {pageList.map((page: string, i) => {
        return (
          <PaginationButton
            state={toState({
              selected: current === parseInt(page),
              ellipsis: page === '.',
            })}
            linkToPage={parseInt(page)}
            onPageChange={onPageChange}
            myKey={i}
          >
            {page}
          </PaginationButton>
        )
      })}
      <PaginationButton
        state={toState({ disable: isLastPage })}
        linkToPage={current + 1}
        onPageChange={onPageChange}
      >
        <ChevronRightIcon disable={isLastPage}></ChevronRightIcon>
      </PaginationButton>
    </HStack>
  )
}
