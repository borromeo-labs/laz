import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { signIn } from 'next-auth/react'
import { useMutation } from 'react-query'
import { useAxios } from '@/contexts/Axios'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver as resolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { AuthLayout } from '@/page-components/AuthLayout'
import { Button, TextInput } from '@/components'
import { replace } from 'lodash'

const schema = Yup.object({
  email: Yup.string().email().required(),
  name: Yup.string().required(),
  password: Yup.string().min(8).required(),
  password_confirmation: Yup.string()
    .min(8)
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

type RegisterFormValues = Yup.InferType<typeof schema>

export default function Register() {
  const { axios } = useAxios()

  const { control, handleSubmit, formState } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      password: '',
      password_confirmation: ''
    },
    resolver: resolver(schema)
  })

  const { replace } = useRouter()

  const handleRegister = async (values: RegisterFormValues) => {
    await axios.post('/auth/register', values)

    const { error } = await signIn('credentials', {
      redirect: false,
      username: values.email,
      password: values.password
    })

    if (error) {
      // @TODO: Let's show a toast and redirect to the login screen.
      // Registration didn't necessaril fail, just the login portion (e.g.,)., server failed)
      // https://linear.app/borromeo-labs/issue/BOR-59/if-auto-sign-in-errors-redirect-to-sign-in-page-and-show-toast
      throw error
    }
  }

  const { mutateAsync, isLoading, error } = useMutation('register', handleRegister, {
    onSuccess() {
      replace('/')
    }
  })

  const onSubmit = handleSubmit((values) => {
    mutateAsync(values)
  })

  return (
    <>
      <div>
        <h3 className="text-h3 font-semibold">Create an account</h3>
        <p>
          Already have an account?{' '}
          <Link href="/login" passHref>
            <a className="text-primary-500 cursor-pointer">Sign in</a>
          </Link>
        </p>
      </div>

      <div className="h-[1px] bg-neutral-200 my-24"></div>

      <form onSubmit={onSubmit}>
        <div className="space-y-24">
          {/* @TODO: https://linear.app/borromeo-labs/issue/BOR-60/improve-design-for-errors */}
          {Boolean(error) && <div className="text-red-400 p-4">An error occurred while creating your account.</div>}

          <Controller
            control={control}
            name="email"
            render={({ field }) => <TextInput {...field} label="Email" type="email" />}
          />

          <Controller control={control} name="name" render={({ field }) => <TextInput {...field} label="Name" />} />

          <Controller
            control={control}
            name="password"
            render={({ field }) => <TextInput {...field} label="Password" type="password" />}
          />

          <Controller
            control={control}
            name="password_confirmation"
            render={({ field }) => <TextInput {...field} label="Confirm Password" type="password" />}
          />

          <Button type="submit" disabled={isLoading || !formState.isValid}>
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </div>
      </form>
    </>
  )
}

Register.getLayout = (app) => {
  return <AuthLayout>{app}</AuthLayout>
}
