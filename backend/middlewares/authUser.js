import jwt from 'jsonwebtoken'

// user authentication middleware

const authUser = async (req,res,next) => {
    try{
      //  const {token} = req.headers
      const token = req.headers.token;
        if(!token) {
            return res.json({success:false,message:'NOT Authorized Login Again'})
        }
      //  const token_decode = jwt.verify(token,process.env.JWT_SECRET)
         const decoded = jwt.verify(token, process.env.JWT_SECRET);

       // req.body.userId = token_decode.id
       req.userId = decoded.id;

        next()

    } catch (error) {
        console.log(error)
         res.json({success:false, message:error.message})
    }
}

export default authUser