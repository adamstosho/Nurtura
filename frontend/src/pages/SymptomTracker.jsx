"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "../contexts/ToastContext"
import { api } from "../utils/api"
import { Activity, Lightbulb, CheckCircle } from "lucide-react"
import Card, { CardContent, CardHeader } from "../components/Card"
import Button from "../components/Button"
import Input from "../components/Input"
import Modal from "../components/Modal"

const SymptomTracker = () => {
  const [symptom, setSymptom] = useState("")
  const [loading, setLoading] = useState(false)
  const [showTipsModal, setShowTipsModal] = useState(false)
  const [healthTips, setHealthTips] = useState([])
  const [errors, setErrors] = useState({})

  const { showSuccess, showError } = useToast()
  const navigate = useNavigate()

  const commonSymptoms = [
    "Headache",
    "Fever",
    "Cough",
    "Fatigue",
    "Nausea",
    "Dizziness",
    "Chest Pain",
    "Shortness of Breath",
    "Stomach Pain",
    "Back Pain",
    "Joint Pain",
    "Sore Throat",
    "Runny Nose",
    "Muscle Aches",
  ]

  const handleSymptomSelect = (selectedSymptom) => {
    setSymptom(selectedSymptom)
    setErrors({})
  }

  const validateForm = () => {
    const newErrors = {}

    if (!symptom.trim()) {
      newErrors.symptom = "Please enter or select a symptom"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await api.post("/symptoms", { symptom: symptom.trim() })

      if (response.data.tips && response.data.tips.length > 0) {
        setHealthTips(response.data.tips)
        setShowTipsModal(true)
      }

      showSuccess("Symptom logged successfully!")
      setSymptom("")
    } catch (error) {
      showError(error.response?.data?.error || "Failed to log symptom")
    } finally {
      setLoading(false)
    }
  }

  const handleModalClose = () => {
    setShowTipsModal(false)
    setHealthTips([])
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Log Your Symptoms</h1>
        <p className="mt-2 text-gray-600">Track your symptoms to better understand your health patterns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Symptom Form */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold text-gray-900">Enter Symptom</h2>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Describe your symptom"
                value={symptom}
                onChange={(e) => {
                  setSymptom(e.target.value)
                  setErrors({})
                }}
                error={errors.symptom}
                placeholder="e.g., headache, fever, cough..."
                className="text-lg"
              />

              <Button type="submit" className="w-full" loading={loading} disabled={loading || !symptom.trim()}>
                {loading ? "Logging Symptom..." : "Log Symptom"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Common Symptoms */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Common Symptoms</h2>
            <p className="text-sm text-gray-600">Click on any symptom to select it</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {commonSymptoms.map((commonSymptom) => (
                <button
                  key={commonSymptom}
                  onClick={() => handleSymptomSelect(commonSymptom)}
                  className={`
                    p-3 text-left rounded-lg border transition-colors
                    ${
                      symptom.toLowerCase() === commonSymptom.toLowerCase()
                        ? "border-primary bg-blue-50 text-primary"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }
                  `}
                >
                  <span className="text-sm font-medium">{commonSymptom}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-8">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              variant="secondary"
              onClick={() => navigate("/symptoms/history")}
              className="flex items-center justify-center space-x-2"
            >
              <Activity className="h-4 w-4" />
              <span>View History</span>
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/tips")}
              className="flex items-center justify-center space-x-2"
            >
              <Lightbulb className="h-4 w-4" />
              <span>Health Tips</span>
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/clinics")}
              className="flex items-center justify-center space-x-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Find Clinics</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Health Tips Modal */}
      <Modal
        isOpen={showTipsModal}
        onClose={handleModalClose}
        title="Health Tips for Your Symptom"
        className="max-w-2xl"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-green-600 mb-4">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Symptom logged successfully!</span>
          </div>

          {healthTips.map((tip, index) => (
            <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{tip.body}</p>
            </div>
          ))}

          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                handleModalClose()
                navigate("/symptoms/history")
              }}
            >
              View History
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default SymptomTracker
