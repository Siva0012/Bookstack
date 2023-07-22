const erroHandler = (err , req , res , next) => {
//      console.log(err.stack , "al;sdjfpaosdjfoaijfoasijdfosdijfoaijdfasdfsd");

     if(res.headerSent) {
      return next(err)
     }

     if(err.status === 500) {
      res.status(500).json({error : "Internal server Error"})
     } else {
      return next(err)
     }
}

module.exports = erroHandler