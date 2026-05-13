const { Router } = require( 'express' );
const userRouter = Router();
const userController = require( '../controllers/userController' );

userRouter.get( '/', userController.indexController );
userRouter.get( '/sign-up', userController.signUpControllerGet );
userRouter.post( '/sign-up', userController.signUpControllerPost );
userRouter.get( '/login', userController.loginControllerGet  );
userRouter.post( '/login', userController.loginControllerPost );

module.exports = userRouter;