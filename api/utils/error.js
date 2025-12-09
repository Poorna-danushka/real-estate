export const errorHandler=(statusCode,message)=>{
    const error = new Error()
    error.statusCode=statusCode
    error.message=message
    return error
}//use in auth control to user defined errors 
//not used yet use in later 