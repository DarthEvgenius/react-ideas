import AllIdeasPage from './pages/AllIdeasPage'
import { TrpcProvider } from './providers/TrpcProvider'

const a = "asdf"
console.log('a',a)

function App() {
  return (
    <TrpcProvider>
      <AllIdeasPage />
    </TrpcProvider>
  )
}

export default App
