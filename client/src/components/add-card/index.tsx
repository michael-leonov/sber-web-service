import React, { useEffect } from 'react'
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
    formState,
    formState: { errors },
    reset,
  } = useForm<FormValues>()

  const [addCard, { isLoading: isAdding }] = useAddCardMutation()

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setTimeout(() => {
        reset({ title: '', description: '' })
      }, 2000)
    }
  }, [formState, reset])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    data.userId = id
    await addCard(data).unwrap()
  }

  return (
    <main>
      <div className='container mx-auto'>
        <h1>Форма добавление новой карточки</h1>

        <form
          className='relative flex flex-col items-center gap-y-2'
          onSubmit={handleSubmit(onSubmit)}
        >
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

          {formState.isSubmitSuccessful && (
            <p className='text-sm font-semibold text-center text-emerald-500'>
              Форма успешно отправлена!
            </p>
          )}

          <button className='main-button mb-4 inline-flex items-center px-4' disabled={isAdding}>
            {isAdding ? (
              <>
                <svg className='animate-spin h-5 w-5 mr-3 text-white' viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
                </svg>
                <>Обработка...</>
              </>
            ) : (
              <>Добавить карточку</>
            )}
          </button>
        </form>
      </div>
    </main>
  )
}

export default AddCard
