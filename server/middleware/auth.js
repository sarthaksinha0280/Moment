import jwt from 'jsonwebtoken';

//want to like post
//click the like button => auth middleaware (NEXT) => like controller

const auth = async (req,res,next) => {
    try {
        
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {  //for own token
            decodedData = jwt.verify(token, 'test');  //here test is the secrete data

            req.userId = decodedData?.id;
        } else{
            decodedData = jwt.decode(token); //this is for google token we not need any secrete


            req.userId = decodedData?.sub;    //here sub is used in google it used to specifes the differ in google user
             
        }

        next();  //next means after verification you like or delete thet post
    } catch (error) {
         console.log(error);
    }
}

export default auth;
