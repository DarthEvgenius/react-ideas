import AllIdeasPage from './pages/AllIdeasPage'
import { TrpcProvider } from './providers/TrpcProvider'


function App() {
  return (
    <TrpcProvider>
      <AllIdeasPage />
    </TrpcProvider>
  )
}

export default App
