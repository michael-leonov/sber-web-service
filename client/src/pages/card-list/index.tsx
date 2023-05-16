/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Card from '../../components/card'
import { useGetCardsQuery } from '../../redux/services/cardApi'

const CardList = () => {
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
      <div className='container mx-auto'>
        <h1>Список карточек</h1>
        {isEmptyList ? (
          <span>Карточки отсутствуют</span>
        ) : (
          <div className='grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-x-8 xl:gap-x-10'>
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
