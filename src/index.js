'use strict'

const Hapi = require('@hapi/hapi')
const axios = require('axios')

const url = 'https://teamtreehouse.com/jonathanwalz.json'

async function getUser(req, h) {
    try {
        const resp = await axios.get(url)
        return h
            .response(
                JSON.stringify({
                    data: resp.data.points,
                }),
            )
            .code(200)
            .header('access-control-allow-methods', 'GET', 'OPTIONS')
            .header('content-type', 'application/json')
    } catch (err) {
        return h.err(err)
    }
}

const init = async () => {
    const server = Hapi.server({
        port: 8080,
        host: 'localhost',
    })

    server.route({
        method: 'OPTIONS',
        path: '/points',
        handler: (req, h) => {
            return h
                .response('success')
                .code(200)
                .header('Access-Control-Allow-Origin', '*')
                .header('Access-Control-Allow-Headers', 'content-type')
                .header('Access-Control-Allow-Methods', 'GET', 'OPTIONS')
        },
    })

    server.route({
        method: 'GET',
        path: '/points',
        handler: getUser,
        options: {
            json: {
                space: 4,
                suffix: 'after',
            },
            cors: {
                origin: [ '*' ],
            },
        },
    })

    await server.start()
    console.log('Server running on %ss', server.info.uri)
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init()
