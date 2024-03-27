const Token = require("../models/token")
const jwt =require("jsonwebtoken")

module.exports = async (req, res, next) => {

    const auth = req.headers?.authorization || null
    const tokenKey = auth ? auth.split(' ') : null 

    if (tokenKey) {

        if (tokenKey[0] == 'Token') { 

            const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('userId')
            req.user = tokenData ? tokenData.userId : undefined
           
        } else if (tokenKey[0] == 'Bearer') { 

            jwt.verify(tokenKey[1], process.env.ACCESS_KEY, (err, userData) => req.user = userData)
        }
    }

    next()
}

// Kimlik doğrulama işlemi başarılı olduğunda, kullanıcı bilgileri genellikle bir kullanıcı nesnesi içinde saklanır. Bu kullanıcı nesnesi, Express istek nesnesine (req) atanır ve genellikle req.user gibi bir isimle erişilebilir hale getirilir.