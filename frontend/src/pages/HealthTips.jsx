"use client"

import { useState, useEffect } from "react"
import { useToast } from "../contexts/ToastContext"
import { api } from "../utils/api"
import { Lightbulb, Search, RefreshCw } from "lucide-react"
import Card, { CardContent, CardHeader } from "../components/Card"
import Button from "../components/Button"
import Input from "../components/Input"
import LoadingSpinner from "../components/LoadingSpinner"

const HealthTips = () => {
  const [tips, setTips] = useState([])
  const [filteredTips, setFilteredTips] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const { showError, showSuccess } = useToast()

  useEffect(() => {
    fetchHealthTips()
  }, [])

  useEffect(() => {
    filterTips()
  }, [tips, searchTerm])

  const fetchHealthTips = async () => {
    setLoading(true)
    try {
      const response = await api.get("/tips")
      setTips(response.data.tips)
      showSuccess("Health tips loaded successfully!")
    } catch (error) {
      showError("Failed to load health tips")
    } finally {
      setLoading(false)
    }
  }

  const filterTips = () => {
    if (!searchTerm) {
      setFilteredTips(tips)
      return
    }

    const filtered = tips.filter(
      (tip) =>
        tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.body.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredTips(filtered)
  }

  const handleRefresh = () => {
    fetchHealthTips()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Health Tips</h1>
        <p className="mt-2 text-gray-600">Discover valuable health insights and tips to improve your wellbeing</p>
      </div>

      {/* Search and Actions */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search health tips..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tips Grid */}
      {filteredTips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Lightbulb className="h-5 w-5 text-secondary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">{tip.title}</h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{tip.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Lightbulb className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? "No tips found" : "No health tips available"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? "Try adjusting your search terms or clear the search to see all tips."
                : "Health tips are currently unavailable. Please try refreshing the page."}
            </p>
            {searchTerm ? (
              <Button variant="secondary" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            ) : (
              <Button onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Tips
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tips Count */}
      {filteredTips.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Showing {filteredTips.length} of {tips.length} health tips
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>
      )}
    </div>
  )
}

export default HealthTips
