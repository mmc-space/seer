import type { FC, PropsWithChildren } from 'react'
import { createContext } from 'react'

import * as store from '@/store'

export const RootContext = createContext<IStore | null>(null)

export const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <RootContext.Provider value={{ ...store }}>{children}</RootContext.Provider>
  )
}
