const formatCurrency = (number) => {
  const value = Number(number)

  // Prevent long numerical values from overflowing the modal at least.
  // Feeling very grateful that we somehow need to handle this case :)
  // 1,444,332 -> 1.44m
  return value >= 1e6 ? `${format(value / 1e6)}m` : format(value)
}

const format = (value: number) => {
  // 1324.324 -> 1,324.32
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace('$', '₱')
}

export { formatCurrency }
