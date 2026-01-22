import axios from "axios"
import { useState } from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from "react-router-dom"

function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [age, setAge] = useState("")
  const [department, setDepartment] = useState("")

  const navigate = useNavigate()

  async function signupEmployee(e) {
    e.preventDefault()

    try {
      await axios.post("http://localhost:4000/api/employee/signup", {
        name,
        email,
        password,
        age,
        department
      })

      alert("Employee registration successful 🔥")
      navigate("/")
    } catch (error) {
      console.log(error)
      alert(error.response?.data?.message || "Registration failed")
    }
  }

  return (
    <>
      <h2 className="text-center py-4">Sign up for HR</h2>

      <Form onSubmit={signupEmployee} className="w-50 mx-auto border border-2 border-dark p-5">

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Age..."
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Department"
            onChange={(e) => setDepartment(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default Register
