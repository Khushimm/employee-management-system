import NavigationBar from "../components/navigation";
import { Container, Card, Table } from "react-bootstrap";

function Contact() {
  return (
    <>
      <NavigationBar />

      <Container className="mt-4">
        <Card className="p-4 shadow-sm">
          <h3 className="mb-3 text-center">Department Contacts</h3>

          <Table bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Department</th>
                <th>In-charge Name</th>
                <th>Contact Number</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Human Resources (HR)</td>
                <td>Khushi Magadum</td>
                <td>+91 98765 43210</td>
                <td>hr@zyphertech.com</td>
              </tr>

              <tr>
                <td>Finance</td>
                <td>Rohit Sharma</td>
                <td>+91 91234 56789</td>
                <td>finance@zyphertech.com</td>
              </tr>

              <tr>
                <td>IT Support</td>
                <td>Anjali Verma</td>
                <td>+91 99887 66554</td>
                <td>it.support@zyphertech.com</td>
              </tr>

              <tr>
                <td>Operations</td>
                <td>Vikram Desai</td>
                <td>+91 90011 22334</td>
                <td>operations@zyphertech.com</td>
              </tr>

              <tr>
                <td>Marketing</td>
                <td>Neha Kulkarni</td>
                <td>+91 90909 80808</td>
                <td>marketing@zyphertech.com</td>
              </tr>

              <tr>
                <td>Administration</td>
                <td>Arjun Patil</td>
                <td>+91 95555 44433</td>
                <td>admin@zyphertech.com</td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </Container>
    </>
  );
}

export default Contact;
