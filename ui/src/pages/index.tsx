import dynamic from 'next/dynamic'
import { AppLayout } from '@/page-components/AppLayout'
import { getGuardedRoutesServerProps } from '@/server'

const ExpenseMonth = dynamic<{}>(() => import('@/page-components/ExpenseMonth').then((module) => module.ExpenseMonth), {
  ssr: false,
})

export default function Home() {
  return <ExpenseMonth />
}

Home.getLayout = (app) => {
  return <AppLayout>{app}</AppLayout>
}

export const getServerSideProps = getGuardedRoutesServerProps
