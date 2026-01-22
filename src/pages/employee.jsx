import { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import NavigationBar from "../components/navigation";

function Employee() {
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    post: "",
    joiningDate: "",
    type: "Employee",
  });

  const [showForm, setShowForm] = useState(false);

  // FETCH EMPLOYEES FROM BACKEND (READ)
  const getEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/employee/");
      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ADD EMPLOYEE (CREATE)
  const handleAddEmployee = async (e) => {
    e.preventDefault();

    const { name, post, joiningDate } = formData;
    if (!name || !post || !joiningDate) return;

    try {
      await axios.post("http://localhost:4000/api/employee/", {
        name: name,
        department: post,      // mapped
        age: 22,               // dummy (backend requires)
        email: `${Date.now()}@employee.com`, // unique dummy
        password: "12345",     // dummy
      });

      await getEmployees(); // refresh list from DB

      setFormData({
        name: "",
        post: "",
        joiningDate: "",
        type: "Employee",
      });

      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE EMPLOYEE (DELETE)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/employee/${id}`);
      getEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavigationBar />

      <div className="p-4">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold">Employees</h4>
          <Button onClick={() => setShowForm(!showForm)}>
            Add Employee
          </Button>
        </div>

        {/* ADD EMPLOYEE FORM */}
        {showForm && (
          <Card className="mb-4">
            <Card.Body>
              <Form onSubmit={handleAddEmployee}>
                <Form.Group className="mb-2">
                  <Form.Label>Employee Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Post / Designation</Form.Label>
                  <Form.Control
                    type="text"
                    name="post"
                    placeholder="e.g. Software Developer"
                    value={formData.post}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Joining Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Employee Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option>Employee</option>
                    <option>Intern</option>
                  </Form.Select>
                </Form.Group>

                <Button type="submit">Save</Button>
              </Form>
            </Card.Body>
          </Card>
        )}

        {/* EMPLOYEE LIST */}
        {employees.length === 0 && (
          <p className="text-muted">No employees added yet.</p>
        )}

        {employees.map((emp) => (
          <Card key={emp._id} className="mb-2">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mb-1">{emp.name}</h6>
                <small className="text-muted">
                  {emp.department} | Employee
                </small>
              </div>

              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(emp._id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Employee;
