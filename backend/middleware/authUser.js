import jwt from 'jsonwebtoken'

//user authentication middleware
const authUser = async (req, res, next) => {
    try {
        //grab the token
        const {token} = req.headers;
        if(!token){
            return res.json({
                success: false,
                message: "Not Authorized login again"
            });
        }
        //decode token
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = tokenDecode.id;

        next();
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}

export default authUser;