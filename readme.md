# Deepl unoficial client for Node.js

free deepl translation using the deepl web API (1.2.0)

# Demo :
```js
const deepl = require("deepl-web")

deepl.translate("salut tout le monde","auto","EN")
.then(console.log)
.catch((error)=>console.log("error : " + error))

```
## Return : 
```js
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
# Translation with cached results :
if the translation is not yet in the cache, then it translates the text, adds it to the cache and returns it, if it already has the translation present it just returns it.
```js
deepl.translateWithCache(`Salut tout le monde, comment ca va ?`,"auto","EN")
.then(console.log)
.catch((error)=>console.log("error : " + error))

```
### Clear the cache : 
```js
deepl.clearCache()
```
### Get the cache (JSON) : 
```js
deepl.getCacheJson()
```
### Get target languages available :
```js
deepl.targetLanguagesAvailable()
.then(rep=>console.log(rep))
.catch(function(e) {
  console.log(e);
});

// return : 
[
  'en-US', 'en-GB', 'DE',    'FR',
  'ES',    'pt-PT', 'pt-BR', 'IT',
  'NL',    'PL',    'RU',    'JA',
  'ZH',    'BG',    'CS',    'DA',
  'ET',    'FI',    'EL',    'HU',
  'LV',    'LT',    'RO',    'SK',
  'SL',    'SV'
]
```