import { useState } from 'react'

export function useForm<F extends Record<string, string>>(initial: F) {
  const [state, setState] = useState(initial)

  function register(key: keyof F) {
    return {
      value: state[key],
      onChange: (e: any) => {
        setState((state) => ({ ...state, [key]: e.target.value }))
      },
    }
  }

  return [state, register, setState] as const
}
