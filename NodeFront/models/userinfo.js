
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const adminSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
	userName: {
    type: String,
    required: true
  },
	password: {
    type: String,
    required: true
  },
	id: Number,
	createTime: String,
	city: String,
})

adminSchema.index({_id: 1})

const Admin = mongoose.model('Admin', adminSchema)


export default Admin