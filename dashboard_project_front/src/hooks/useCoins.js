import { useQuery } from '@tanstack/react-query'
import { fetchCoins } from '../api/cryptoApi'

export function useCoins() {
  return useQuery({
    queryKey: ['coins'],
    queryFn: fetchCoins,
    staleTime: 30000,
  })
}
