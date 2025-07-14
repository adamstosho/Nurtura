"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../contexts/ToastContext"
import { User, Mail, MapPin, Calendar, Edit } from "lucide-react"
import Card, { CardContent, CardHeader } from "../components/Card"
import Button from "../components/Button"

const Profile = () => {
  const { user, logout } = useAuth()
  const { showSuccess } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  const handleLogout = () => {
    logout()
    showSuccess("Logged out successfully!")
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="mt-2 text-gray-600">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{user?.name}</h3>
                    <p className="text-gray-600">HealthPulse User</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Region</p>
                      <p className="text-sm text-gray-600">{user?.region}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={() => (window.location.href = "/symptoms")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Log Symptom
                </Button>

                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={() => (window.location.href = "/symptoms/history")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  View History
                </Button>

                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={() => (window.location.href = "/emergency")}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Emergency Contacts
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Account</h2>
            </CardHeader>
            <CardContent>
              <Button variant="danger" className="w-full" onClick={handleLogout}>
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile
