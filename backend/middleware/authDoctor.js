import jwt from 'jsonwebtoken'

//doctor authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        //grab the token
        const {dtoken} = req.headers;
        if(!dtoken){
            return res.json({
                success: false,
                message: "Not Authorized login again"
            });
        }
        //decode token
        const tokenDecode = jwt.verify(dtoken, process.env.JWT_SECRET);

        req.body.docId = tokenDecode.id;

        next();
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}

export default authDoctor;