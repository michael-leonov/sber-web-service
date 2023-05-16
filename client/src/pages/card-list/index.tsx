/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Card from '../../components/card'
import { useGetCardsQuery } from '../../redux/services/cardApi'

const CardList = () => {
  const LIMIT = 10

  const { data, isLoading, isError } = useGetCardsQuery()

  const isEmptyList = !isLoading && !data?.length

  if (isLoading) {
    return <span>Загрузка..</span>
  }

  if (isError) {
    return <span>Ошибка!</span>
  }

  return (
    <main>
      <div className='container mx-auto px-2.5'>
        <h1>Список карточек</h1>
        {isEmptyList ? (
          <span>Карточки отсутствуют</span>
        ) : (
          <div className='grid grid-cols-2 gap-3'>
            {data.map((card: any) => (
              <Card key={card.id} {...card} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default CardList
