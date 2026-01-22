import NavigationBar from "../components/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("hrEmail");

  // FETCH LOGGED-IN HR DETAILS
  async function getProfile() {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/employee/profile/${email}`
      );
      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // If not logged in, redirect to login
    if (!email) {
      navigate("/");
      return;
    }

    getProfile();
  }, [email]);

  // UPDATE PROFILE
  async function updateProfile(e) {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:4000/api/employee/${profile._id}`,
        {
          name: profile.name,
          department: profile.department,
          age: profile.age,
        }
      );

      setEditMode(false);
      getProfile();
    } catch (error) {
      console.log(error);
    }
  }

  // LOADING STATE (prevents blank page)
  if (!profile) {
    return (
      <>
        <NavigationBar />
        <p className="text-center mt-4">Loading profile...</p>
      </>
    );
  }

  return (
    <>
      <NavigationBar />

      <Container className="mt-4">
        <Card className="p-4 shadow-sm">
          <h3 className="mb-3">My Profile</h3>

          <Form onSubmit={updateProfile}>
            {/* NAME */}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={profile.name}
                disabled={!editMode}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </Form.Group>

            {/* EMAIL (READ ONLY) */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control value={profile.email} disabled />
            </Form.Group>

            {/* DEPARTMENT */}
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                value={profile.department}
                disabled={!editMode}
                onChange={(e) =>
                  setProfile({ ...profile, department: e.target.value })
                }
              />
            </Form.Group>

            {/* AGE */}
            <Form.Group className="mb-4">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={profile.age}
                disabled={!editMode}
                onChange={(e) =>
                  setProfile({ ...profile, age: e.target.value })
                }
              />
            </Form.Group>

            {!editMode ? (
              <Button
                type="button"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <Button type="submit" variant="success">
                Save Changes
              </Button>
            )}
          </Form>
        </Card>
      </Container>
    </>
  );
}

export default Profile;
