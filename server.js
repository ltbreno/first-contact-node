import http from 'node:http'
import { json } from './middlewares/json.js' 
import { randomUUID } from 'node:crypto'
import { routes } from './middlewares/routes.js'
// import fastify from 'fastify'


// GET , POST , PUT , PATCH , DELETE

// GET => Buscar uma informação do back-end
// POST => Criar uma informação no back-end
// PUT => Editar ( ou atualizar ) um recurso no back-end
// PATCH => Atualizar uma informação especifica de um recurso no back-end
// Delete => Deletar um recurso no back-end

// Stateful - Stateless

// JSON - JavaScript Object Notation

// Cabeçalhos (Requisição / resposta) => Metadados

// HTTP Status Code

// Query Parameters: URL Stateful => Filtros, Paginação, Não obrigatorias
// Route Parameters
// Request Body

// http://localhost:3333/users?userId=1
// http: localhost:3333/users/1

const server = http.createServer(async (req, res) =>{
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if ( route ) {
        const routeParams = req.url.match(route.path)

        console.log(routeParams)
        
        return route.handler(req, res)
    }

    return res.writeHead(404).end("Não encontrado")
})

server.listen(3333)
// localhost:3333