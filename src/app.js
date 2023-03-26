const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer)
//handlebars
const handlebars = require('express-handlebars')
//Routers
const routerProducts = require('./routers/routerProducts')
const routerRealTimeP = require('./routers/routerRealTimeP')(io)
const routerCarts = require('./routers/routerCarts')


app.use(express.urlencoded({ extended: false }));


// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));


app.engine('handlebars', handlebars.engine())
app.set('views',__dirname + '/views')

app.use(express.json())
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/api/realTimeProducts', routerRealTimeP)

io.on('connection', socket => {
  console.log('cliente conectado')
  io.emit('mensaje', 'hola desde el server')
})

//servidor Sockets
const puerto = 8080
httpServer.listen(puerto, ()=>{
  console.log(`server running at port ${puerto}`)
})


