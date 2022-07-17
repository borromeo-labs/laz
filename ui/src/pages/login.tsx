import React from 'react'
import Link from 'next/link'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver as resolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { AuthLayout } from '@/page-components/AuthLayout'
import { Button, TextInput } from '@/components'

const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required()
})

export default function Login() {
  const { control, handleSubmit, formState, setValue, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: resolver(schema)
  })

  return (
    <>
      <div>
        <h3 className="text-h3 font-semibold">Sign in</h3>
        <p>
          Don't have an account?{' '}
          <Link href="/register" passHref>
            <a className="text-primary-500 cursor-pointer">Sign up</a>
          </Link>
        </p>
      </div>

      <div className="h-[1px] bg-neutral-200 my-24"></div>

      <div className="space-y-24">
        <Controller
          control={control}
          name="email"
          render={({ field }) => <TextInput {...field} label="Email" type="email" />}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextInput
              {...field}
              label="Password"
              type="password"
              helper={{ url: '/password-reset', label: 'Reset password' }}
            />
          )}
        />

        <Button type="submit">Sign in</Button>
      </div>
    </>
  )
}

Login.getLayout = (app) => {
  return <AuthLayout>{app}</AuthLayout>
}
