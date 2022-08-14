import express from 'express'
import protect from '../middleware/authMiddleware.js'
const router = express.Router()


import { authAdmin , putUserLeave,evaluateUserLeave,deleteUser} from '../controller/adminController.js'

// router.route('/').post(registerUser)
router.post('/',authAdmin)
router.route('/leave').put(putUserLeave)
router.route('/evaluateLeave').put(evaluateUserLeave)
router.route('/delete').put(deleteUser)

export default router
