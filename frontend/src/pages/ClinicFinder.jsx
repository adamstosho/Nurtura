"use client"

import { useState, useEffect } from "react"
import { useToast } from "../contexts/ToastContext"
import { api } from "../utils/api"
import { MapPin, Search, Navigation } from "lucide-react"
import Card, { CardContent, CardHeader } from "../components/Card"
import Button from "../components/Button"
import Input from "../components/Input"
import LoadingSpinner from "../components/LoadingSpinner"

const ClinicFinder = () => {
  const [clinics, setClinics] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useState({
    region: "",
    city: "",
    name: "",
  })

  const { showError, showSuccess } = useToast()

  const regions = [
    "Lagos",
    "Abuja",
    "Kano",
    "Ibadan",
    "Port Harcourt",
    "Benin City",
    "Kaduna",
    "Jos",
    "Ilorin",
    "Enugu",
    "Aba",
    "Onitsha",
  ]

  useEffect(() => {
    // Load clinics on component mount with default search
    searchClinics()
  }, [])

  const handleInputChange = (field, value) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }))
  }

  const searchClinics = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()

      if (searchParams.region) params.append("region", searchParams.region)
      if (searchParams.city) params.append("city", searchParams.city)
      if (searchParams.name) params.append("name", searchParams.name)

      const response = await api.get(`/clinics?${params.toString()}`)
      setClinics(response.data.clinics)

      if (response.data.clinics.length === 0) {
        showError("No clinics found matching your search criteria")
      } else {
        showSuccess(`Found ${response.data.clinics.length} clinics`)
      }
    } catch (error) {
      showError("Failed to search clinics")
      setClinics([])
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = () => {
    setSearchParams({ region: "", city: "", name: "" })
    setClinics([])
  }

  const getDirections = (clinic) => {
    if (clinic.coordinates && clinic.coordinates.lat && clinic.coordinates.lon) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${clinic.coordinates.lat},${clinic.coordinates.lon}`
      window.open(url, "_blank")
    } else {
      const query = encodeURIComponent(`${clinic.name} ${clinic.address}`)
      const url = `https://www.google.com/maps/search/?api=1&query=${query}`
      window.open(url, "_blank")
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Find Clinics</h1>
        <p className="mt-2 text-gray-600">Locate healthcare facilities in your area</p>
      </div>

      {/* Search Form */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">Search Clinics</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                value={searchParams.region}
                onChange={(e) => handleInputChange("region", e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">All regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="City"
              value={searchParams.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder="Enter city name..."
            />

            <Input
              label="Clinic Name"
              value={searchParams.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Search by name..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={searchClinics}
              loading={loading}
              disabled={loading}
              className="flex items-center space-x-2"
            >
              <Search className="h-4 w-4" />
              <span>Search Clinics</span>
            </Button>

            <Button variant="secondary" onClick={clearSearch} className="flex items-center space-x-2">
              <span>Clear Search</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : clinics.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Search Results ({clinics.length})</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinics.map((clinic, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 leading-tight">{clinic.name}</h3>
                      {clinic.region && (
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-primary rounded-full mt-2">
                          {clinic.region}
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600">{clinic.address}</p>
                    </div>

                    {clinic.coordinates && (
                      <div className="flex items-center space-x-2">
                        <Navigation className="h-4 w-4 text-gray-400" />
                        <p className="text-xs text-gray-500">
                          {clinic.coordinates.lat.toFixed(4)}, {clinic.coordinates.lon.toFixed(4)}
                        </p>
                      </div>
                    )}

                    <div className="pt-3 border-t border-gray-100">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => getDirections(clinic)}
                        className="w-full flex items-center justify-center space-x-2"
                      >
                        <Navigation className="h-4 w-4" />
                        <span>Get Directions</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No clinics found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria or search in a different area.</p>
            <Button onClick={() => searchClinics()}>
              <Search className="h-4 w-4 mr-2" />
              Search Again
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ClinicFinder
