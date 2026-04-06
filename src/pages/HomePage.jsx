import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'

function HomePage() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (query) => {
    setLoading(true)
    setError(null)
    try {
      const url = `https://world.openfoodfacts.org/api/v2/search?categories_tags=${encodeURIComponent(query)}&page_size=10`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const products = Array.isArray(data.products) ? data.products : []
      const filtered = products.filter(
        (p) => p.product_name && p.product_name.trim() !== ''
      )
      setResults(filtered)
    } catch {
      setError('Unable to fetch food data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h2>Search Nutrition Info</h2>
      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && results.length === 0 && !error && (
        <p>Search for a food to begin</p>
      )}

      <FoodList products={results} />
    </div>
  )
}

export default HomePage