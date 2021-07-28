const fetch = require("node-fetch")
const JSONdb = require('simple-json-db');
const db = new JSONdb('./translated.json');
const translate = function(text, sourceLang = "auto", targetLang) {
  return new Promise((resolve, reject) => {

    if (sourceLang != "auto") { sourceLang = sourceLang.toUpperCase() }

    targetLang = targetLang.toUpperCase()

    fetch("https://www2.deepl.com/jsonrpc?method=LMT_handle_jobs", {
      "headers": {
        "accept": "*/*",
        "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "sec-gpc": "1"
      },
      "referrer": "https://www.deepl.com/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "{\"jsonrpc\":\"2.0\",\"method\": \"LMT_handle_jobs\",\"params\":{\"jobs\":[{\"kind\":\"default\",\"raw_en_sentence\":\"" + text + "\",\"raw_en_context_before\":[],\"raw_en_context_after\":[],\"preferred_num_beams\":4,\"quality\":\"fast\"}],\"lang\":{\"preference\":{\"weight\":{\"DE\":0,\"EN\":0,\"ES\":0,\"FR\":0,\"IT\":0,\"JA\":0,\"NL\":0,\"PL\":0,\"PT\":0,\"RU\":0,\"ZH\":0,\"BG\":0,\"CS\":0,\"DA\":0,\"EL\":0,\"ET\":0,\"FI\":0,\"HU\":0,\"LT\":0,\"LV\":0,\"RO\":0,\"SK\":0,\"SL\":0,\"SV\":0},\"default\":\"default\"},\"source_lang_user_selected\":\"" + sourceLang + "\",\"target_lang\":\"" + targetLang + "\"},\"priority\":-1,\"timestamp\":" + Date.now() + "},\"id\":" + Math.random() * 13 + "}",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    }).then(r => r.json()).then((json) => {
      if (json.error) {
        reject(json.error.message)
      }
      var detectedLanguage = "unsupported"
      var detectedLanguageIndice = 0
      Object.keys(json.result.detectedLanguages).forEach(function(key) {
        let indice = json.result.detectedLanguages[key]
        if (indice > detectedLanguageIndice) {
          detectedLanguage = key
          detectedLanguageIndice = indice
        }
      })
      resolve({
        resultText: json.result.translations[0].beams[0].postprocessed_sentence,
        allResults: json.result.translations[0].beams.map(r => r.postprocessed_sentence),
        detectedLanguage,
        detectedLanguageIndice,
        detectedLanguages: json.result.detectedLanguages,
        targetLang: json.result.target_lang,
        sourceLang: json.result.source_lang
      })
    }).catch(reject)
  })
}

const translateWithCache = function(text, sourceLang = "auto", targetLang) {
  return new Promise((resolve, reject) => {
    if (sourceLang != "auto") { sourceLang = sourceLang.toUpperCase() }
    targetLang = targetLang.toUpperCase()
    let key = `${sourceLang}_to_${targetLang}__${text}`
    if (db.has(key)) {
      resolve(db.get(key))
    } else {
      translate(text, sourceLang, targetLang).then(rep => {
        setImmediate(() => { db.set(key, rep) })
        resolve(rep)
      })
    }
  })

}

module.exports.getCacheJson = () =>{return db.JSON()};
module.exports.clearCache = () => {
  try {
    db.JSON({})
  }
  catch (e) {

  }
}
module.exports.translate = translate
module.exports.translateWithCache = translateWithCache
