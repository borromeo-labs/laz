import numeral from 'numeral'

interface Expense {
  amount: number
  description: string
}

const parseExpenseString = (str: string): Expense => {
  const [amount, ...words] = str.split(' ')

  return {
    amount: numeral(amount).value(),
    description: words.join(' ')
  }
}

export { parseExpenseString }
