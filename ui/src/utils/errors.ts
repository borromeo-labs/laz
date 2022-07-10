// Used to signal that the error is unlikely and more likely a type guard
const fatal = (error: string) => {
  throw new Error(error)
}

export { fatal }
