import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'

function HomePage() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (query) => {
    setLoading(true)
    try {
      const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&json=1`)
      const data = await response.json()
      setResults(data.products || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h2>Search Nutrition Info</h2>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {results.length === 0 && !loading && <p>No results found</p>}
      {results.length > 0 && <FoodList items={results} />}
    </div>
  )
}

export default HomePage