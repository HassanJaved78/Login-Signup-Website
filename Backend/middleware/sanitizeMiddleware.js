import mongoSanitize from "mongo-sanitize"

export const sanitizeInputs = (req, res, next) => {

    if (req.body) {
        for (const key in req.body) {
            req.body[key] = mongoSanitize(req.body[key])
        }
    }

    if (req.params) {
        for (const key in req.params) {
            req.params[key] = mongoSanitize(req.params[key])
        }
    }

    if (req.query) {
        for (const key in req.query) {
            req.query[key] = mongoSanitize(req.query[key])
        }
    }

    next()
}