import cookieParser from 'cookie-parser';
import 'dotenv/config';
import exp from 'express'
import db from './src/config/mongo.setup.js';
import  authRouter from './src/routes/authRoutes.js'
import userRouter from './src/routes/userRoutes.js';
import chatRouter from './src/routes/chatRouter.js'
import messageRouter from './src/routes/messageRoutes.js'


const app=exp()

app.listen(3000)
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));
app.use(cookieParser())
db();
//routes
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/chat',chatRouter);
app.use('/api/message',messageRouter);


