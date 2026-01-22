import Employee from "../Modals/employee.js"

export async function getAllEmployees(req, res) {
  try {
    const result = await Employee.find()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export async function addEmployee(req, res) {
  const { name, email, password, age, department } = req.body

  try {
    await Employee.create({ name, email, password, age, department })
    res.status(200).json({ message: "Employee has been created successfully" })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export async function editEmployee(req, res) {
  const { id } = req.params
  const { name, email, password, age, department } = req.body

  try {
    await Employee.findByIdAndUpdate(
      id,
      { name, email, password, age, department },
      { new: true }
    )

    res.status(200).json({ message: "Updated successfully" })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export async function deleteEmployee(req, res) {
  const { id } = req.params

  try {
    await Employee.findByIdAndDelete(id)
    res.status(200).json({ message: "Deleted successfully 🔥" })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export async function loginEmployee(req, res) {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "fill in all the blanks" })
    }

    const result = await Employee.findOne({ email })

    if (!result) {
      return res.status(400).json({ message: "employee not found" })
    }

    if (result.password !== password) {
      return res.status(400).json({ message: "password is incorrect" })
    }

    res.status(200).json({ message: "Login successfully 🔥" })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export async function getEmployeeLeaves(req, res) {
  try {
    const result = await Employee.find({}, { name: 1, leaves: 1 })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function updateEmployeeLeave(req, res) {
  const { id } = req.params
  const { taken, applied } = req.body

  try {
    await Employee.findByIdAndUpdate(
      id,
      {
        "leaves.taken": taken,
        "leaves.applied": applied
      },
      { new: true }
    )

    res.status(200).json({ message: "Leave updated successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function getProfileByEmail(req, res) {
  const { email } = req.params;

  try {
    const employee = await Employee.findOne({ email });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
