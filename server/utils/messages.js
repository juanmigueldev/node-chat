const createMessage = (name, message) => {
    console.log(name, message);
   
    return {
        name,
        message,
        date: new Date().getTime()
    }
}


module.exports = {
    createMessage
}