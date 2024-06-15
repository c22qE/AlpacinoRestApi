const ApiError = require("./ApiError")

const errorHandler = (error, req, reply) => {
    if(error instanceof ApiError) {
        reply.code(error.status).send({ error: error.message }); 
    }
    reply.code(500).send({ error: error.message }); 
}

module.exports = errorHandler