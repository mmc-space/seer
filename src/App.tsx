import { RouterProvider } from 'react-router-dom'

import type { FC } from 'react'
import { Suspense } from 'react'

import { Provider } from './Provider'
import router from '@/routes'

import '@/styles/base.css'
import 'uno.css'

const App: FC = () => {
  return <Provider>
    <Suspense fallback={<h1>loading...</h1>}>
      <RouterProvider router={router} />
    </Suspense>
  </Provider>
}

export default App
