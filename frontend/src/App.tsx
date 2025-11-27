import AllIdeasPage from './pages/AllIdeasPage'
import { TrpcProvider } from './providers/TrpcProvider'

const a: boolean = 1

function App() {
  return (
    <TrpcProvider>
      <AllIdeasPage />
    </TrpcProvider>
  )
}

export default App
