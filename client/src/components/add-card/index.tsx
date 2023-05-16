import React from 'react'
import { useAddCardMutation } from '../../redux/services/cardApi'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppSelector } from '../../redux/hooks'
import { selectUser } from '../../redux/features/userSlice'

type FormValues = {
  title: string
  description: string
  userId: number | null
}

const AddCard = () => {
  const { id } = useAppSelector(selectUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const [addCard, { isLoading: isAdding }] = useAddCardMutation()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    data.userId = id
    await addCard(data).unwrap()
  }

  return (
    <main>
      <div className='container mx-auto px-2.5'>
        <h1>Форма добавление новой карточки</h1>

        <form className='flex flex-col items-center gap-y-2' onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='title'>Заголовок карточки </label>
          <input
            type='text'
            className={`form-element-custom ${
              errors.title && 'border-red-500 focus:border-red-600'
            }`}
            disabled={isAdding}
            {...register('title', {
              required: 'Введите заголовок',
            })}
          />
          {errors?.title && <p className='error'>{errors.title.message}</p>}

          <label htmlFor='description'>Описание карточки </label>
          <textarea
            className={`form-element-custom ${
              errors.description && 'border-red-500 focus:border-red-600'
            }`}
            disabled={isAdding}
            {...register('description', {
              required: 'Введите описание',
            })}
          />

          {errors.description && <p className='error'>{errors.description.message}</p>}

          <button className='main-button mb-4' disabled={isAdding}>
            Добавить карточку
          </button>
        </form>
      </div>
    </main>
  )
}

export default AddCard
