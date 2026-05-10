import jwt from 'jsonwebtoken'

// doctor authentication middleware

const authDoctor = async (req,res,next) => {
    try{
      //  const {token} = req.headers
      const dtoken = req.headers.dtoken;
        if(!dtoken) {
            return res.json({success:false,message:'NOT Authorized Login Again'})
        }
      //  const token_decode = jwt.verify(token,process.env.JWT_SECRET)
         const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

       // req.body.userId = token_decode.id
       req.docId = decoded.id;

        next()

    } catch (error) {
        console.log(error)
         res.json({success:false, message:error.message})
    }
}

export default authDoctor
