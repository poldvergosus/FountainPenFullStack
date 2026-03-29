import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    const {token} = req.headers;

    if (!token) {
        return res.json({success: false, message: 'Not Authorized Login Again'})
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const optionalAuth = async (req, res, next) => {
    const {token} = req.headers;

    if (token) {
        try {
            const token_decode = jwt.verify(token, process.env.JWT_SECRET)
            req.body.userId = token_decode.id
        } catch (error) {
            console.log('Invalid or expired token, proceeding as guest')
            req.body.userId = null
        }
    } else {
        req.body.userId = null
    }
    
    next()
}

export { auth, optionalAuth } 
export default auth 