import express from 'express'
import { getAllUsers } from '../controllers/user'
import auth from '../middleware/authChecker'

const router = express.Router()

router.get('/', auth, getAllUsers)

export default router
