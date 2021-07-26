# Deepl unoficial client for Node.js

free deepl translation using the deepl web API

```js
const deepl = require("deepl-web")

deepl.translate("salut tout le monde","auto","EN")
.then(console.log)
.catch((error)=>console.log("error : " + error))

```
## Return : 
```json
{
  resultText: 'hi everyone',
  allResults: [ 'hi everyone', 'hello everyone', 'hi, everyone', 'hi, everybody' ],
  detectedLanguage: 'FR',
  detectedLanguageIndice: 0.9664159999999999,
  detectedLanguages: {
    EN: 0.007528999999999999,
    DE: 0.00007599999999999999,
    FR: 0.9664159999999999,
    IT: 0.001731,
    NL: 0.002469,
    PL: 0.000126,
    CS: 0.00008999999999999999,
    DA: 0.000339,
    ET: 0.000184,
    FI: 0.005078,
    HU: 0.000054999999999999995,
    RO: 0.00041299999999999996,
    SK: 0.000018,
    SL: 0.000017,
    SV: 0.000341,
    unsupported: 0.015097999999999999
  },
  targetLang: 'EN',
  sourceLang: 'FR'
}
```

