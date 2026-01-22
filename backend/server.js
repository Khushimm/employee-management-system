import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"

import employeeRoutes from "./routes/routes.js"
import Employee from "./Modals/employee.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/employee", employeeRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

// ✅ THIS NOW WORKS because mongoose is imported
mongoose.connection.once("open", async () => {
  await Employee.updateMany(
    { leaves: { $exists: false } },
    {
      $set: {
        leaves: { total: 20, taken: 0, applied: 0 }
      }
    }
  )
  console.log("Leaves field ensured for existing employees")
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
