'use client'

import { useState } from 'react'
import Link from 'next/link'
import FormInput from '../../components/FormInput'
import Toast from '../../components/Toast'

export default function RegisterPage() {
  const [activeRole, setActiveRole] = useState('donor')
  const [formData, setFormData] = useState({
    // Common fields
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    telegramUsername: '', // used for telegram notification on donation events
    acceptTerms: false,
    
    // Donor specific
    fullName: '',
    bloodType: '',
    
    // Health Center specific
    centerName: '',
    contactPerson: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Common validations
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions'
    }

    // Role-specific validations
    if (activeRole === 'donor') {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required'
      }
      if (!formData.bloodType) {
        newErrors.bloodType = 'Blood type is required'
      }
    } else {
      if (!formData.centerName.trim()) {
        newErrors.centerName = 'Health center name is required'
      }
      if (!formData.contactPerson.trim()) {
        newErrors.contactPerson = 'Contact person is required'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Prepare registration data
      const registrationData = {
        role: activeRole,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        location: formData.location,
        telegramUsername: formData.telegramUsername, // used for telegram notification on donation events
        ...(activeRole === 'donor' ? {
          fullName: formData.fullName,
          bloodType: formData.bloodType
        } : {
          centerName: formData.centerName,
          contactPerson: formData.contactPerson
        })
      }

      console.log('Registration data:', registrationData)
      
      setToast({
        show: true,
        message: `Registration successful! Welcome to Lifeline as a ${activeRole === 'donor' ? 'Blood Donor' : 'Health Center'}`,
        type: 'success'
      })
      
      // Reset form
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        location: '',
        telegramUsername: '',
        acceptTerms: false,
        fullName: '',
        bloodType: '',
        centerName: '',
        contactPerson: ''
      })
      
      // Here you would typically redirect to login or dashboard
      // router.push('/login')
      
    } catch (error) {
      setToast({
        show: true,
        message: 'Registration failed. Please try again.',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const bloodTypeOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-midnight">
              <span className="text-crimson">Life</span>line
            </h1>
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-midnight">
            Join Our Community
          </h2>
          <p className="mt-2 text-gray-600">
            Register to start saving lives or find donors
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Role Toggle */}
          <div className="mb-8">
            <p className="text-sm font-medium text-midnight mb-4 text-center">I want to register as:</p>
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setActiveRole('donor')}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                  activeRole === 'donor'
                    ? 'bg-crimson text-white shadow-sm'
                    : 'text-gray-600 hover:text-midnight'
                }`}
              >
                Blood Donor
              </button>
              <button
                type="button"
                onClick={() => setActiveRole('health_center')}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                  activeRole === 'health_center'
                    ? 'bg-crimson text-white shadow-sm'
                    : 'text-gray-600 hover:text-midnight'
                }`}
              >
                Health Center
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role-specific fields */}
            {activeRole === 'donor' ? (
              <>
                <FormInput
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  error={errors.fullName}
                />
                
                <FormInput
                  label="Blood Type"
                  type="select"
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                  options={bloodTypeOptions}
                  placeholder="Select your blood type"
                  required
                  error={errors.bloodType}
                />
              </>
            ) : (
              <>
                <FormInput
                  label="Health Center Name"
                  name="centerName"
                  value={formData.centerName}
                  onChange={handleInputChange}
                  placeholder="Enter health center name"
                  required
                  error={errors.centerName}
                />
                
                <FormInput
                  label="Contact Person"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  placeholder="Enter contact person name"
                  required
                  error={errors.contactPerson}
                />
              </>
            )}

            {/* Common fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, State"
                required
                error={errors.location}
              />
              
              <FormInput
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                required
                error={errors.phone}
              />
            </div>

            <FormInput
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required
              error={errors.email}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a strong password"
                required
                error={errors.password}
              />
              
              <FormInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
                error={errors.confirmPassword}
              />
            </div>

            {/* Telegram Username - Optional but highlighted */}
            <div className="bg-gradient-to-r from-teal-green/10 to-teal-green/5 p-4 rounded-lg border border-teal-green/20">
              <FormInput
                label={`Telegram Username${activeRole === 'health_center' ? ' or Group ID' : ''}`}
                name="telegramUsername"
                value={formData.telegramUsername}
                onChange={handleInputChange}
                placeholder={activeRole === 'donor' ? '@yourusername' : '@yourusername or group ID'}
                error={errors.telegramUsername}
              />
              <p className="text-sm text-teal-green mt-1">
                <span className="font-medium">Recommended:</span> Get instant notifications about donation requests and updates via Telegram.
                {/* used for telegram notification on donation events */}
              </p>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-6">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-crimson focus:ring-crimson border-gray-300 rounded"
                />
                <label htmlFor="acceptTerms" className="ml-3 text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-crimson hover:text-red-700 font-medium">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-crimson hover:text-red-700 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.acceptTerms && <p className="text-crimson text-sm mt-1 ml-7">{errors.acceptTerms}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-primary text-lg py-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </div>
              ) : (
                `Register as ${activeRole === 'donor' ? 'Donor' : 'Health Center'}`
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-medium text-crimson hover:text-red-700 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-midnight transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  )
} 