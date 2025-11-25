import AllIdeasPage from './pages/AllIdeasPage'
import { TrpcProvider } from './lib/trpc'

function App() {
  return (
    <TrpcProvider>
      <AllIdeasPage />
    </TrpcProvider>
  )
}

export default App
