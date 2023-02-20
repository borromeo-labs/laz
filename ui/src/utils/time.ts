const delay = async (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

export { delay }
