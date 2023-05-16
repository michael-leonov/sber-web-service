/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import Card from '../../components/card'
import { useGetCardsQuery } from '../../redux/services/cardApi'

const CardList = () => {
  const [page, setPage] = useState<number>(1)
  const LIMIT = 15 as number

  const { data, isLoading, isError, isFetching, isSuccess } = useGetCardsQuery({
    page,
    limit: LIMIT,
  })

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight
      if (scrolledToBottom && !isFetching) {
        setPage((page) => page + 1)
      }
    }

    document.addEventListener('scroll', onScroll)

    return function () {
      document.removeEventListener('scroll', onScroll)
    }
  }, [page, isFetching])

  const isEmptyList = !isLoading && !data?.length

  if (isLoading) {
    return <span>Загрузка..</span>
  }

  if (isError) {
    return <span>Ошибка!</span>
  }

  return (
    <main className='pb-10'>
      <div className='container mx-auto'>
        <h1>Список карточек</h1>
        {isEmptyList ? (
          <span>Карточки отсутствуют</span>
        ) : (
          <div className='grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-x-8 xl:gap-x-10'>
            {isSuccess && data.map((card: any) => <Card key={card.id} {...card} />)}
          </div>
        )}
      </div>
    </main>
  )
}

export default CardList
