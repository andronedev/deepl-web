const deepl = require("./index")

deepl.translateWithCache(`hey comme un `,"FR","FR")
.then(rep=>console.log(rep))
.catch(function(e) {
  console.log(e);
});


deepl.targetLanguagesAvailable()
.then(rep=>console.log(rep))
.catch(function(e) {
  console.log(e);
});