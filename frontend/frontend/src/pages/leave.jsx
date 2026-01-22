import NavigationBar from "../components/navigation.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

function Leave() {
  const [leaves, setLeaves] = useState([]);

  // FETCH LEAVES (READ)
  async function getLeaves() {
    try {
      const res = await axios.get("http://localhost:4000/api/employee/leaves");
      setLeaves(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLeaves();
  }, []);


  async function approveLeave(emp) {
    if (emp.leaves.applied <= 0) return;

    await axios.put(`http://localhost:4000/api/employee/leaves/${emp._id}`, {
      taken: emp.leaves.taken + 1,
      applied: emp.leaves.applied - 1,
    });

    getLeaves();
  }

  return (
    <>
      <NavigationBar />

      <h3 className="text-center my-4">Employee Leave Management</h3>

      <Container>
        <Row className="g-4">
          {leaves.map((emp) => {
            const remaining =
              emp.leaves.total - (emp.leaves.taken + emp.leaves.applied);

            return (
              <Col md={4} key={emp._id}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title className="fw-bold">{emp.name}</Card.Title>

                    <Card.Text>
                      <strong>Total Leaves:</strong> {emp.leaves.total}
                    </Card.Text>

                    <Card.Text className="text-success">
                      <strong>Taken:</strong> {emp.leaves.taken}
                    </Card.Text>

                    <Card.Text className="text-warning">
                      <strong>Applied:</strong> {emp.leaves.applied}
                    </Card.Text>

                    <Card.Text className="text-danger">
                      <strong>Remaining:</strong> {remaining}
                    </Card.Text>

                    <Button
                      variant="success"
                      size="sm"
                      className="ms-2"
                      disabled={emp.leaves.applied <= 0}
                      onClick={() => approveLeave(emp)}
                    >
                      Approve Leave
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Leave;
