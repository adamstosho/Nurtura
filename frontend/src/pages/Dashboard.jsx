"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../contexts/ToastContext"
import { api } from "../utils/api"
import { Activity, Heart, TrendingUp, Plus, ArrowRight, Lightbulb, MapPin } from "lucide-react"
import Card, { CardContent, CardHeader } from "../components/Card"
import Button from "../components/Button"
import LoadingSpinner from "../components/LoadingSpinner"

const Dashboard = () => {
  const { user } = useAuth()
  const { showError } = useToast()
  const [recentSymptoms, setRecentSymptoms] = useState([])
  const [healthTips, setHealthTips] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [symptomsRes, tipsRes] = await Promise.all([api.get("/symptoms"), api.get("/tips")])

      setRecentSymptoms(symptomsRes.data.symptoms.slice(0, 5))
      setHealthTips(tipsRes.data.tips.slice(0, 3))
    } catch (error) {
      showError("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
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
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="mt-2 text-gray-600">Here's your health overview for today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-primary to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Symptoms</p>
                <p className="text-3xl font-bold">{recentSymptoms.length}</p>
              </div>
              <Activity className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-secondary to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Health Tips</p>
                <p className="text-3xl font-bold">{healthTips.length}</p>
              </div>
              <Lightbulb className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-accent to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Your Region</p>
                <p className="text-xl font-bold">{user?.region}</p>
              </div>
              <MapPin className="h-12 w-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Symptoms */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Symptoms</h2>
              <Link to="/symptoms/history">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentSymptoms.length > 0 ? (
              <div className="space-y-4">
                {recentSymptoms.map((symptom) => (
                  <div key={symptom.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="font-medium text-gray-900 capitalize">{symptom.symptom}</span>
                    </div>
                    <span className="text-sm text-gray-500">{formatDate(symptom.timestamp)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No symptoms logged yet</p>
                <Link to="/symptoms">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Log First Symptom
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Health Tips */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Health Tips</h2>
              <Link to="/tips">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {healthTips.length > 0 ? (
              <div className="space-y-4">
                {healthTips.map((tip, index) => (
                  <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <h3 className="font-medium text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{tip.body}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Lightbulb className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No health tips available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/symptoms">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Plus className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-medium text-gray-900">Log Symptom</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/clinics">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-medium text-gray-900">Find Clinics</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/emergency">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-medium text-gray-900">Emergency</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/symptoms/history">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-medium text-gray-900">View History</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
