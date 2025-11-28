import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllIdeasPage from './pages/AllIdeasPage'
import ViewIdeaPage from './pages/ViewIdeaPage'
import { TrpcProvider } from './providers/TrpcProvider'
import {
  getAllIdeasRoute,
  getViewIdeaRoute,
  viewIdeaRouteParams,
} from './lib/routes'
import Layout from './components/Layout'

function App() {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getAllIdeasRoute()} element={<AllIdeasPage />} />
            <Route
              path={getViewIdeaRoute(viewIdeaRouteParams)}
              element={<ViewIdeaPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}

export default App
