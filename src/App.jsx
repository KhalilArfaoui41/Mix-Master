import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  Landing,
  HomeLayout,
  Error,
  About,
  Newsletter,
  Cocktail,
  SinglePageError,
} from './pages/index'
import { loader as landingLoader } from './pages/Landing'
import { loader as SingleCocktailLoader } from './pages/Cocktail'
import { action as newsLetterLoader } from './pages/Newsletter'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})
const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
          loader: landingLoader(queryClient),
          errorElement: <SinglePageError />,
        },
        {
          path: '/cocktail/:id',
          element: <Cocktail />,
          errorElement: <SinglePageError />,
          loader: SingleCocktailLoader(queryClient),
        },
        {
          path: '/newsletter',
          element: <Newsletter />,
          action: newsLetterLoader,
        },
        {
          path: '/about',
          element: <About />,
        },
      ],
    },
  ])
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default App
