import { AppLayout } from '@/page-components/AppLayout'
import { ExpenseMonth } from '@/page-components/ExpenseMonth'

export default function Home() {
  return <ExpenseMonth />
}

Home.getLayout = (app) => {
  return <AppLayout>{app}</AppLayout>
}
