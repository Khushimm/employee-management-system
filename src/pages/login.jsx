import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/api/employee/login", {
        email,
        password,
      });
      localStorage.setItem("hrEmail", email);
      navigate("/home");

    } catch (err) {
      alert("Login failed");
    }
  }

  return (
    <>
      <div className="login-page">
        <div className="login-illustrate">
          <h1 className="text-center fs-1">ZypherTech</h1>
        </div>

        <div className="login-card">
          <Form onSubmit={login}>
            <h1 className="fs-3 text-center">Oh!! Ready to work 🤵‍♀️</h1>
            <br />

            <Form.Group className="mb-3">
              <Form.Label>Email/Username</Form.Label>
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

            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Login
              </Button>

              <Button
                variant="outline-primary"
                type="button"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
