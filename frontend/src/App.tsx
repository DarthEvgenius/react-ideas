import AllIdeasPage from './pages/AllIdeasPage'
import { TrpcProvider } from './providers/TrpcProvider'

const a = "asdf"
function App() {
  return (
    <TrpcProvider>
      <AllIdeasPage />
    </TrpcProvider>
  )
}

export default App
