const formatCurrency = (number) => {
  return Number(number).toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace('$', '₱')
}

export { formatCurrency }
