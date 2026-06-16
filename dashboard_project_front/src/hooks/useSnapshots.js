import { useQuery } from '@tanstack/react-query'
import { fetchSnapshots } from '../api/cryptoApi'

export function useSnapshots() {
  return useQuery({
    queryKey: ['snapshots'],
    queryFn: fetchSnapshots,
    refetchInterval: 15000,
    staleTime: 10000,
  })
}
