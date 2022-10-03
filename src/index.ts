import express from 'express'
import diaryRouter from './routes/diaries'

const app = express()
app.use(express.json())

// Routes
app.get('/ping', (req, res) => {
  console.log('Someone pinged here!!!')
  res.send('pong')
})

app.use('/api/diaries', diaryRouter)

// Start server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
