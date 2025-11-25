import type { TrpcRouterType } from '@reactideas/backend/src/trpc'
import { createTRPCReact } from '@trpc/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'


export const trpc = createTRPCReact<TrpcRouterType>()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // these options are comfortable for develop
      refetchOnWindowFocus: false, // these options are comfortable for develop
    }
  }
})

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3456/trpc' // here we specify endpoint for all trpc routes -> look into backend/index.ts
    })
  ]
})

// provider for page
export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        { children }
      </QueryClientProvider>
    </trpc.Provider>
  )
}
