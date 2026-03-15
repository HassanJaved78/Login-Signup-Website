import sanitizeHtml from "sanitize-html"

const clean = (value) => {

    if (typeof value === "string") {
        return sanitizeHtml(value, {
            allowedTags: [],
            allowedAttributes: {}
        })
    }

    return value
}

export const xssSanitize = (req, res, next) => {

    if (req.body) {
        for (const key in req.body) {
            req.body[key] = clean(req.body[key])
        }
    }

    if (req.query) {
        for (const key in req.query) {
            req.query[key] = clean(req.query[key])
        }
    }

    if (req.params) {
        for (const key in req.params) {
            req.params[key] = clean(req.params[key])
        }
    }

    next()
}