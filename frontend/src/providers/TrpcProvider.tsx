import { trpc, trpcClient, queryClient } from '../lib/trpc'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

// provider for page
export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
