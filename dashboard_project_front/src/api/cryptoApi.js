const BASE_URL = '/api'

export async function fetchCoins() {
  const res = await fetch(`${BASE_URL}/coins/`)
  if (!res.ok) throw new Error('Error al obtener monedas')
  return res.json()
}

export async function fetchSnapshots() {
  const res = await fetch(`${BASE_URL}/snapshots/`)
  if (!res.ok) throw new Error('Error al obtener snapshots')
  return res.json()
}

export async function fetchCoinHistory(coinId) {
  const res = await fetch(`${BASE_URL}/coins/${coinId}/history`)
  if (!res.ok) throw new Error('Error al obtener historial')
  return res.json()
}

export async function fetchLastSnapshot(coinId) {
  const res = await fetch(`${BASE_URL}/coins/${coinId}/latest`)
  if (!res.ok) throw new Error('Error al obtener último snapshot')
  return res.json()
}
