'use client'

import {
  ArticleSummary,
  createEmptyArticleSummary,
} from '@/models/ArticleSummary'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

export const useHomePage = async (articleSummaries: ArticleSummary[]) => {
  const params: ReadonlyURLSearchParams =
    useSearchParams() ?? new ReadonlyURLSearchParams()

  const page = parseInt(params.get('page') ?? '1')
  const perPage = parseInt(params.get('per_page') ?? '6')
  const pageCount = Math.ceil(articleSummaries.length / perPage)

  // 記事要素の数がページングによって変化しないように
  // perPageの倍数になるまでダミー要素を追加する
  const paddedArticleSummaries = articleSummaries.concat(
    new Array(perPage - (articleSummaries.length % perPage)).fill(
      createEmptyArticleSummary()
    )
  )

  const pagedArticleSummaries = paddedArticleSummaries.slice(
    (page - 1) * perPage,
    page * perPage
  )

  const buttonCount = 7 // 短すぎず長すぎない奇数のボタン数

  const router = useRouter()

  const onPageChange = (newPage: number): void => {
    router.push(`/?page=${newPage}&per_page=${perPage}`)
  }

  return {
    page,
    pageCount,
    buttonCount,
    pagedArticleSummaries,
    onPageChange,
  }
}
