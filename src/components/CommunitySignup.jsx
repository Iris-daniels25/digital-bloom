import { useState } from 'react'

const initialState = {
  name: '',
  email: '',
  audience: '',
}

function CommunitySignup() {
  const [formData, setFormData] = useState(initialState)
  const [status, setStatus] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(
      'Thanks for your interest. This form is currently a placeholder until the live signup integration is connected.',
    )
    setFormData(initialState)
  }

  return (
    <section className="section" id="community" aria-labelledby="community-title">
      <div className="section-heading">
        <h2 id="community-title">Community Signup</h2>
        <p>Be first to hear about upcoming resources and learning opportunities.</p>
      </div>
      <form className="signup-form card" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="audience">I am a...</label>
          <select
            id="audience"
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            required
          >
            <option value="">Select one</option>
            <option value="beauty-professional">Beauty professional</option>
            <option value="small-business-owner">Small business owner</option>
            <option value="other-supporter">Other supporter</option>
          </select>
        </div>

        <button className="btn btn-primary" type="submit">
          Grow With Us 🌱
        </button>

        <p className="form-note" role="status" aria-live="polite">
          {status}
        </p>
      </form>
    </section>
  )
}

export default CommunitySignup
