import { useQuery } from '@tanstack/react-query'
import { fetchCoinHistory } from '../api/cryptoApi'

export function useCoinHistory(coinId) {
  return useQuery({
    queryKey: ['coinHistory', coinId],
    queryFn: () => fetchCoinHistory(coinId),
    enabled: !!coinId,
    staleTime: 60000,
  })
}

export function useLastSnapshot(coinId) {
  return useQuery({
    queryKey: ['lastSnapshot', coinId],
    queryFn: () => fetchLastSnapshot(coinId),
    enabled: !!coinId,
    refetchInterval: 15000,
    staleTime: 10000,
  })
}
