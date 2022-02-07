import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import errorHandler from './middlewares/error-handler'
import registerRoutes from './routes'
import process from 'process'
import {FRONTEND_DOMAIN, COOKIE_SECRET, NODE_ENV} from './config/env'
import ApiError from './utils/error'

const app = express()

app.use(express.json())
app.use(cookieParser(COOKIE_SECRET))
app.use(cors({origin: FRONTEND_DOMAIN, credentials: true}))

registerRoutes(app)
app.use(errorHandler())

process.on('uncaughtException', (error) => {
  console.log("inside uncaughtException line 21", error)
  throw new ApiError('Uncaught server Exception', 500)
})


// Serve static assets (build folder) if in production	
if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, './client')))
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, './client/index.html'));
  });
} else {
  app.use(express.static(path.join(path.resolve(__dirname, '../../client/public'))));
  console.log(path.resolve(__dirname, '../../client/index.html'));
  app.get('*', (_, res) => {
    res.sendFile(path.join(path.resolve(__dirname, '../../client/public/index.html')));
  });
}

export default app
