import express from 'express'
import {handleCreateUser, handleLoginUser, handleLogoutUser, handlePersistUser} from '../route_handlers/user'

const router = express.Router()

router.route('/create').post(handleCreateUser)
router.route('/login').post(handleLoginUser)
router.route('/logout').get(handleLogoutUser)
router.route('/persist').post(handlePersistUser)

export default router
