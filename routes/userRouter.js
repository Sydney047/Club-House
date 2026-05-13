const { Router } = require( 'express' );
const userRouter = Router();
const userController = require( '../controllers/userController' );
const messagesController = require( '../controllers/messagesController' );

userRouter.get( '/', userController.indexController );
userRouter.get( '/sign-up', userController.signUpControllerGet );
userRouter.post( '/sign-up', userController.signUpControllerPost );
userRouter.get( '/login', userController.loginControllerGet  );
userRouter.post( '/login', userController.loginControllerPost );
userRouter.get( '/logout', userController.logoutController );
userRouter.get( '/:id/create-new-message', messagesController.createNewMessageGet );
userRouter.post( '/:id/create-new-message', messagesController.createNewMessagePost );

module.exports = userRouter;