import React from 'react'
import Link from 'next/link'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver as resolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { AuthLayout } from '@/page-components/AuthLayout'
import { Button, TextInput } from '@/components'

const schema = Yup.object({
  email: Yup.string().email().required(),
  name: Yup.string().required(),
  password: Yup.string().min(8).required(),
  password_confirmation: Yup.string()
    .min(8)
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export default function Register() {
  const { control, handleSubmit, formState, setValue, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      password: '',
      password_confirmation: ''
    },
    resolver: resolver(schema)
  })

  return (
    <>
      <div>
        <h3 className="text-h3 font-semibold">Create an account</h3>
        <p>
          Already have an account?{' '}
          <Link href="/login" passHref>
            <a className="text-blue-500 cursor-pointer">Sign in</a>
          </Link>
        </p>
      </div>

      <div className="h-[1px] bg-slate-100 my-24"></div>

      <div className="space-y-16">
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
          render={({ field }) => <TextInput {...field} label="Confirm Password" type="password_confirmation" />}
        />
      </div>

      <div className="mb-24"></div>

      <Button>Create account</Button>
    </>
  )
}

Register.getLayout = (app) => {
  return <AuthLayout>{app}</AuthLayout>
}
