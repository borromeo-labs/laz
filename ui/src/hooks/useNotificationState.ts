import React, { useState, useRef } from 'react'

type UseNotificationStateReturnType = [boolean, () => void, number]

// Allows you to set an ephemeral state that turns off in <ms>.
// This useful when paired with Headless UI <Transition /> to show a quick success state that turns off.
// This hook includes a counter to be used as `key` so Transition has an easy time simulating a remount.
const useNotificationState = (ms: number): UseNotificationStateReturnType => {
  const [visibility, setIsVisible] = useState(false)

  const [key, setKey] = useState(0)

  const timeoutRef = useRef<number>()

  const setVisibility = () => {
    clearTimeout(timeoutRef.current)

    setIsVisible(true)

    setKey((key) => key + 1)

    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(false)
    }, ms)
  }

  return [visibility, setVisibility, key]
}

export { useNotificationState }
