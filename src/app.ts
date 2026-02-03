import express from 'express'
import cors from 'cors'
import authRoute from './routes/auth.route'
import { authenticate } from './middleware/auth.middleware'
const app = express()

app.use(cors())
app.use(express.json())
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//route untuk auth
app.use('/auth', authRoute)

app.get("/test-middleware", authenticate, (req, res) => {
  res.json({ message: "Success" });
});

export default app;