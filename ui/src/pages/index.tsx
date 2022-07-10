import { AppLayout } from '@/page-components/AppLayout'
import { ExpenseMonth, ExpenseMonthProvider } from '@/page-components/ExpenseMonth'

export default function Home() {
  return (
    <ExpenseMonthProvider>
      <ExpenseMonth />
    </ExpenseMonthProvider>
  )
}

Home.getLayout = (app) => {
  return <AppLayout>{app}</AppLayout>
}
