/** @format */

const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const redis = require('redis')
const cors = require('cors')
const RedisStore = require('connect-redis').default

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require('./config/config')
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')

//Initialize Redis Client
let redisClient = redis.createClient({
  socket: {
    host: REDIS_URL,
    port: REDIS_PORT,
  },
})
redisClient.connect().catch(console.error)

//Initialize Redis Store
let redisStore = new RedisStore({
  client: redisClient,
})

const app = express()

app.use(express.json())

app.enable('trust proxy')
app.use(cors({}))
app.use(
  session({
    store: redisStore,
    secret: SESSION_SECRET,
    cookie: {
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secure: false, // recommended: only set cookies over https. In production you should use secure:true
      httpOnly: true, // recommended: don't let JS code access cookies. Browser extensions run JS code on your browser!
      maxAge: 30000, // set this to 30 minutes or less
    },
  })
)

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

mongoose
  .connect(mongoURL)
  .then(() => console.log('successfully connected to DB!'))
  .catch((e) => console.log(e))

app.get('/api/v1/', (req, res) => {
  res.send(
    '<h2>Hi There! I am Rohan. This is my first attempt at building multiple container application using Docker. I love Docker and Kubernetes very much. Let us push our code to production!! </h2>'
  )
  console.log('yeah it ran')
})

app.use('/api/v1/posts', postRouter)
app.use('/api/v1/users', userRouter)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))
