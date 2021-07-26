const deepl = require("./index")

deepl.translate("salut tout le monde","auto","EN")
.then(console.log)
.catch((error)=>console.log("error : " + error))