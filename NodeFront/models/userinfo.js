
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const adminSchema = new Schema({
	userName: {
    type: String,
    required: true
  },
	password: String,
	id: Number,
	createTime: String,
	city: String,
})

adminSchema.index({id: 1})

const Admin = mongoose.model('Admin', adminSchema)


export default Admin