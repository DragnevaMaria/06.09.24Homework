
// userRouter.ts
import express, {Router} from "express" 
import userController from "./userController"

const router:Router = Router()
// const router = express.Router()

router.get("/login", userController.loginUser)
router.post("/login", userController.authUser)
router.get("/regist", userController.registerUser)
router.post("/regist", userController.authRegistUser)

export default router
