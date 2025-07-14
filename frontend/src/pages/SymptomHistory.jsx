"use client"

import { useState, useEffect } from "react"
import { useToast } from "../contexts/ToastContext"
import { api } from "../utils/api"
import { Calendar, Filter, Download, Activity } from "lucide-react"
import Card, { CardContent, CardHeader } from "../components/Card"
import Button from "../components/Button"
import Input from "../components/Input"
import LoadingSpinner from "../components/LoadingSpinner"

const SymptomHistory = () => {
  const [symptoms, setSymptoms] = useState([])
  const [filteredSymptoms, setFilteredSymptoms] = useState([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const { showError } = useToast()

  useEffect(() => {
    fetchSymptoms()
  }, [])

  useEffect(() => {
    filterSymptoms()
  }, [symptoms, dateRange, searchTerm])

  const fetchSymptoms = async () => {
    try {
      const response = await api.get("/symptoms/history")
      setSymptoms(response.data.symptoms)
    } catch (error) {
      showError("Failed to load symptom history")
    } finally {
      setLoading(false)
    }
  }

  const filterSymptoms = () => {
    let filtered = [...symptoms]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((symptom) => symptom.symptom.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filter by date range
    if (dateRange.from) {
      filtered = filtered.filter((symptom) => new Date(symptom.timestamp) >= new Date(dateRange.from))
    }

    if (dateRange.to) {
      filtered = filtered.filter((symptom) => new Date(symptom.timestamp) <= new Date(dateRange.to + "T23:59:59"))
    }

    // Sort by most recent first
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

    setFilteredSymptoms(filtered)
  }

  const handleDateRangeChange = (field, value) => {
    setDateRange((prev) => ({ ...prev, [field]: value }))
  }

  const clearFilters = () => {
    setDateRange({ from: "", to: "" })
    setSearchTerm("")
  }

  const exportData = () => {
    const csvContent = [
      ["Symptom", "Date", "Time"],
      ...filteredSymptoms.map((symptom) => [
        symptom.symptom,
        new Date(symptom.timestamp).toLocaleDateString(),
        new Date(symptom.timestamp).toLocaleTimeString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "symptom-history.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getSymptomStats = () => {
    const stats = {}
    filteredSymptoms.forEach((symptom) => {
      stats[symptom.symptom] = (stats[symptom.symptom] || 0) + 1
    })
    return Object.entries(stats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Symptom History</h1>
        <p className="mt-2 text-gray-600">Track and analyze your health patterns over time</p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
              <Button variant="secondary" size="sm" onClick={exportData}>
                <Download className="h-4 w-4 mr-1" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Search symptoms"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by symptom name..."
            />

            <Input
              label="From date"
              type="date"
              value={dateRange.from}
              onChange={(e) => handleDateRangeChange("from", e.target.value)}
            />

            <Input
              label="To date"
              type="date"
              value={dateRange.to}
              onChange={(e) => handleDateRangeChange("to", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Symptom List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Symptoms ({filteredSymptoms.length})</h2>
              </div>
            </CardHeader>
            <CardContent>
              {filteredSymptoms.length > 0 ? (
                <div className="space-y-3">
                  {filteredSymptoms.map((symptom) => (
                    <div
                      key={symptom.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900 capitalize">{symptom.symptom}</p>
                          <p className="text-sm text-gray-500">{formatDate(symptom.timestamp)}</p>
                        </div>
                      </div>
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">No symptoms found</p>
                  <p className="text-sm text-gray-400">
                    {symptoms.length === 0 ? "You haven't logged any symptoms yet" : "Try adjusting your filters"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Top Symptoms</h2>
            </CardHeader>
            <CardContent>
              {getSymptomStats().length > 0 ? (
                <div className="space-y-3">
                  {getSymptomStats().map(([symptom, count]) => (
                    <div key={symptom} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 capitalize">{symptom}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${(count / Math.max(...getSymptomStats().map(([, c]) => c))) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No data available</p>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Summary</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Symptoms:</span>
                  <span className="text-sm font-medium">{symptoms.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Filtered Results:</span>
                  <span className="text-sm font-medium">{filteredSymptoms.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Unique Symptoms:</span>
                  <span className="text-sm font-medium">{new Set(symptoms.map((s) => s.symptom)).size}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SymptomHistory
