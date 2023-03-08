import { useContext } from 'react'
import { RootContext } from '@/Provider'
export { default as userStore } from './user'

export const useStore = () => useContext(RootContext)
