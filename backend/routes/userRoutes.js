import express from 'express'
import protect from '../middleware/authMiddleware.js'
const router = express.Router()


import { authUser,getUserProfile,registerUser,updateUserProfile,getUserList ,updateUserAttendance} from '../Controller/userController.js'

router.route('/').get(getUserList)
router.route('/profile').put(updateUserProfile)
router.post('/login',authUser)
router.route('/create').post(registerUser)
router.route('/:id').get(getUserProfile).put(updateUserAttendance)

export default router
