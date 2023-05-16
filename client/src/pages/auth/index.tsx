import React, { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { SIGNUP_ROUTE, CARDLIST_ROUTE } from '../../utils/consts'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '../../redux/hooks'
import { useSignupMutation, useSigninMutation } from '../../redux/services/userApi'
import { setUser } from '../../redux/features/userSlice'

type FormValues = {
  name: string
  password: string
  passwordRepeat: string
}

const Auth = () => {
  const { pathname } = useLocation()

  const isSignUp: boolean = pathname === SIGNUP_ROUTE

  const {
    register,
    watch,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>()

  const name = watch('name')

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [signUp, { data: signUpData, isSuccess: isSuccessSignUp }] = useSignupMutation()

  const [signIn, { data: signInData, isSuccess: isSuccessSignIn }] = useSigninMutation()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (isSignUp) {
      await signUp(data).unwrap()
    } else {
      await signIn(data).unwrap()
    }
  }

  useEffect(() => {
    if (isSuccessSignUp || isSuccessSignIn) {
      dispatch(
        setUser({
          name,
          token: isSuccessSignUp ? signUpData.token : signInData.token,
          id: isSuccessSignUp ? signUpData.user.id : signInData.user.id,
          isAuth: true,
        }),
      )
      navigate(CARDLIST_ROUTE)
    }
  }, [isSuccessSignUp, isSuccessSignIn])

  return (
    <div>
      <div className='container mx-auto px-2.5'>
        <h1 className='text-center'>{isSignUp ? <>Регистрация</> : <>Авторизация</>}</h1>
        <form className='flex flex-col gap-y-2' onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name'>Логин</label>
          <input
            type='text'
            className={`form-element-custom ${
              errors.name && 'border-red-500 focus:border-red-600'
            }`}
            {...register('name', { required: 'Введите логин' })}
          />
          {errors?.name && <span className='error'>{errors.name.message}</span>}

          <label htmlFor='password'>Пароль</label>
          <input
            type='password'
            className={`form-element-custom ${
              errors.password && 'border-red-500 focus:border-red-600'
            }`}
            {...register('password', { required: 'Введите пароль' })}
          />
          {errors?.password && <span className='error'>{errors.password.message}</span>}

          {isSignUp && (
            <>
              <label htmlFor='passwordRepeat'>Подтвердите пароль</label>
              <input
                type='password'
                className={`form-element-custom mb-5 ${
                  errors.passwordRepeat && 'border-red-500 focus:border-red-600'
                }`}
                {...register('passwordRepeat', {
                  required: 'Повторите пароль',
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const { password } = getValues()
                      return password === value || 'Пароли не совпадают'
                    },
                  },
                })}
              />
              {errors?.passwordRepeat && (
                <span className='error'>{errors.passwordRepeat.message}</span>
              )}
            </>
          )}
          {isSignUp ? (
            <button className='main-button self-center px-8'>Зарегистрироваться</button>
          ) : (
            <>
              <button className='main-button self-center px-8'>Войти</button>
              <Link to={SIGNUP_ROUTE} className='main-button self-center px-8'>
                Регистрация
              </Link>
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default Auth
