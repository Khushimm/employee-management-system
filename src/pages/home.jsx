import NavigationBar from "../components/navigation.jsx";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./login.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

function Home() {
  const [employees, setEmployees] = useState([]);
  const [takenLeavesCount, setTakenLeavesCount] = useState(0);

  async function getLeavesCount() {
    const res = await axios.get("http://localhost:4000/api/employee/leaves");

    const totalTaken = res.data.reduce((sum, emp) => sum + emp.leaves.taken, 0);

    setTakenLeavesCount(totalTaken);
  }

  useEffect(() => {
    getLeavesCount();
  }, []);

  async function getData() {
    const res = await axios.get("http://localhost:4000/api/employee/");
    setEmployees(res.data);
  }

  useEffect(() => {
    getData();
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <NavigationBar />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div style={{ padding: "20px" }}>
          <h4 className="fw-bold">HR Dashboard</h4>
          <p className="text-muted">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        <div className="text-dark fw-semibold" style={{ padding: "20px" }}>
          <FaCalendarAlt className="me-2" />
          {today}
        </div>
      </div>

      <Container className="mt-2">
        <Row className="g-4">
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Employees</Card.Title>
                <Card.Text>
                  Manage employee details ({employees.length})
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Leaves</Card.Title>
                <Card.Text>
                  Taken Leaves: <strong>{takenLeavesCount}</strong>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Attendance</Card.Title>
                <Card.Text>Track attendance</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Reports</Card.Title>
                <Card.Text>View HR reports</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
