import { RouterProvider } from 'react-router-dom'

import { Suspense } from 'react'

import router from '@/router'
import 'uno.css'

function App() {
  return <div className="App">
    <Suspense fallback={<h1>loading...</h1>}>
      <RouterProvider router={router} />
    </Suspense>
  </div>
}

export default App
