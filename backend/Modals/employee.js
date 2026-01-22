import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  department: {
    type: String,
    required: true
  },

  leaves: {
    total: {
      type: Number,
      default: 20
    },
    taken: {
      type: Number,
      default: 0
    },
    applied: {
      type: Number,
      default: 0
    }
  }
})

const Employee = mongoose.model("Employee", employeeSchema)

export default Employee