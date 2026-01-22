import express from 'express'
import {
  getAllEmployees,
  addEmployee,
  editEmployee,
  deleteEmployee,
  loginEmployee,
  getEmployeeLeaves,
    updateEmployeeLeave,
    getProfileByEmail
} from "../controllers/user.js"


const router = express.Router()

// CRUD operations
router.get('/', getAllEmployees)
router.get("/leaves", getEmployeeLeaves)
router.post('/', addEmployee)
router.put('/:id', editEmployee)
router.delete('/:id', deleteEmployee)
router.put("/leaves/:id", updateEmployeeLeave)
router.get("/profile/:email", getProfileByEmail);


// login
router.post('/signup', addEmployee)
router.post('/login', loginEmployee)

export default router
