import { hashPassword, verifyPassword } from "@/utils/argon.utils.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "@utils/jwt.utils.js"
import { redis } from "@configs/redis.config.js";

const register = async (registerData: any) => {
    const { username, email, password } = registerData
    try {
        /*
          const isExist = await db.users.findUnique({
             where : {
                email : email
             }
          })
          if(isExist)
          {
            //throw atılacak
          }
    
          const hashedPassword = await hashPassword(password)
    
          const newUser = await db.users.create({
            data : {
                username : username,
                email : email,
                password : hashedPassword
            }
          })
    
          return newUser 
       */
        return
    } catch (error) {
        /* 
          //throw atılacak
        */
    }
}

const login = async (loginData: any) => {
    const { email, password } = loginData
    try {
        /* 
         const isExist = await db.users.findUnique({
            where : {
               email : email
            }
         })
         if(!isExist)
           {
             // throw atılacak
           }
           
          const passwordCheck = await verifyPassword(isExist.password,password)

          if(!passwordCheck)
           {
             //throw atılacak 
           } 
           
           const accessToken = await signAccessToken(isExist.id)
           const refreshToken = await signRefreshToken(isExist.id)

           const {sub,jti,exp} = await verifyRefreshToken(refreshToken) 
       
           const ttl = exp - Math.floor(Date.now()/1000)
           await redis.set(`refresh:${sub}:${jti}`,"1","EX",ttl)

           return {accessToken,refreshToken}
        */
        return { accessToken: "", refreshToken: "" }
    } catch (error) {
        // throw yapılacak
    }
}

const refresh = async (refreshToken: string) => {

}

const logout = async (refreshToken: string) => {
    try {

        const { sub, jti } = await verifyRefreshToken(refreshToken)

        await redis.del(`refresh:${sub}:${jti}`)

        return true
    } catch (error) {
        //throw atılacak
    }
}

export default {
    login,
    refresh,
    logout,
    register
}