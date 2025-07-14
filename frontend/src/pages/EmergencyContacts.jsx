"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../contexts/ToastContext"
import { api } from "../utils/api"
import { Phone, Plus, Edit, AlertTriangle } from "lucide-react"
import Card, { CardContent, CardHeader } from "../components/Card"
import Button from "../components/Button"
import Input from "../components/Input"
import Modal from "../components/Modal"
import LoadingSpinner from "../components/LoadingSpinner"

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    type: "",
    region: "",
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const { user } = useAuth()
  const { showSuccess, showError } = useToast()

  const contactTypes = [
    "Hospital",
    "Clinic",
    "Ambulance",
    "Police",
    "Fire Department",
    "Personal Doctor",
    "Family Member",
    "Friend",
    "Other",
  ]

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
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const params = user?.region ? `?region=${user.region}` : ""
      const response = await api.get(`/emergency${params}`)
      setContacts(response.data.contacts)
    } catch (error) {
      showError("Failed to load emergency contacts")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.number.trim()) {
      newErrors.number = "Phone number is required"
    }

    if (!formData.type) {
      newErrors.type = "Contact type is required"
    }

    if (!formData.region) {
      newErrors.region = "Region is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setSubmitting(true)
    try {
      await api.post("/emergency", formData)
      showSuccess("Emergency contact saved successfully!")
      fetchContacts()
      handleCloseModal()
    } catch (error) {
      showError(error.response?.data?.error || "Failed to save contact")
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (contact) => {
    setEditingContact(contact)
    setFormData({
      name: contact.name,
      number: contact.number,
      type: contact.type,
      region: contact.region,
    })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingContact(null)
    setFormData({ name: "", number: "", type: "", region: user?.region || "" })
    setErrors({})
  }

  const handleAddNew = () => {
    setFormData({ name: "", number: "", type: "", region: user?.region || "" })
    setShowModal(true)
  }

  const callNumber = (number) => {
    window.location.href = `tel:${number}`
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
        <h1 className="text-3xl font-bold text-gray-900">Emergency Contacts</h1>
        <p className="mt-2 text-gray-600">Quick access to important emergency numbers in your area</p>
      </div>

      {/* Emergency Banner */}
      <Card className="mb-8 bg-red-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div>
              <h2 className="text-lg font-semibold text-red-900">Emergency Alert</h2>
              <p className="text-red-700">
                In case of a life-threatening emergency, call 199 (Nigeria Emergency Number) immediately.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Contact Button */}
      <div className="mb-6">
        <Button onClick={handleAddNew} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Emergency Contact</span>
        </Button>
      </div>

      {/* Contacts Grid */}
      {contacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Phone className="h-5 w-5 text-red-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 leading-tight">{contact.name}</h3>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full mt-1">
                        {contact.type}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(contact)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-mono text-gray-900">{contact.number}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Region:</span>
                    <span className="text-xs font-medium text-gray-700">{contact.region}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <Button
                      onClick={() => callNumber(contact.number)}
                      className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Call Now</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Phone className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No emergency contacts found</h3>
            <p className="text-gray-500 mb-6">Add emergency contacts to have quick access during emergencies.</p>
            <Button onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Contact
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Contact Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingContact ? "Edit Emergency Contact" : "Add Emergency Contact"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Contact Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            error={errors.name}
            placeholder="e.g., Lagos University Teaching Hospital"
          />

          <Input
            label="Phone Number"
            value={formData.number}
            onChange={(e) => handleInputChange("number", e.target.value)}
            error={errors.number}
            placeholder="e.g., +234-xxx-xxx-xxxx"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Type</label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className={`
                block w-full px-3 py-2 border rounded-lg shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                ${errors.type ? "border-red-300" : "border-gray-300"}
              `}
            >
              <option value="">Select contact type</option>
              {contactTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && <p className="text-sm text-red-600 mt-1">{errors.type}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
            <select
              value={formData.region}
              onChange={(e) => handleInputChange("region", e.target.value)}
              className={`
                block w-full px-3 py-2 border rounded-lg shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                ${errors.region ? "border-red-300" : "border-gray-300"}
              `}
            >
              <option value="">Select region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            {errors.region && <p className="text-sm text-red-600 mt-1">{errors.region}</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting} disabled={submitting}>
              {editingContact ? "Update Contact" : "Add Contact"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default EmergencyContacts
