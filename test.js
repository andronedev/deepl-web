const deepl = require("./index")

deepl.translateWithCache(`salut tout le monde comment ca va ?`,"auto","EN")
.then(rep=>console.log(rep.resultText))
.catch((error)=>console.log("error : " + error))

//console.log(deepl.getCacheJson())