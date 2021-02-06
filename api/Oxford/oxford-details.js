require('dotenv').config()
const Dictionary = require('oxford-dictionary-api')
const app_id = process.env.APP_ID
const app_key = process.env.APP_KEY
const dict = new Dictionary(app_id, app_key)
dict.find('ace', (error, data) => {
  console.log('####################################')
  if (error) return console.error(`error: ${error}`)
  detailPrint(data)
})

function detailPrint(data) {
  // console.log(JSON.stringify(data, null, 1))
  for (const entry of data.results[0].lexicalEntries) printLexEntry(entry)
}

function printLexEntry(entry) {
  console.log(entry.lexicalCategory)
  let index = 0
  for (const x of entry.entries) {
    printEntry((index = index + 1), x)
  }
}

function printEntry(index, entry) {
  if (entry.etymologies) console.log(`${index}. ${entry.etymologies.join(' | ')}`)
  if (entry.grammaticalFeatures) for (x of entry.grammaticalFeatures) console.log(`text: ${x.text}, type: ${x.type}`)
  if (entry.senses) {
    let index = 0
    for (x of entry.senses) printSense((index = index + 1), x)
  }
}

function printSense(index, sense) {
  if (sense.definitions) console.log(`\t${index}. Main Def: ${sense.definitions.join()}`)
  if (sense.examples) console.log(`\t   Ex: ${getExmaples(sense.examples).join(' ')}`)
  if (sense.domains) console.log(`\t   Domains: ${sense.domains.join()}`)
  if (sense.subsenses) {
    console.log('\t   Subsenses:')
    let index = 0
    for (const x of sense.subsenses) printSubSense((index = index + 1), x)
  }
}

function printSubSense(index, subsenses) {
  console.log(`   \t   ${index}. ${subsenses.definitions.join()}`)
  if (subsenses.examples) console.log(`  \t      Ex: ${getExmaples(subsenses.examples).join(' ')}`)
  if (subsenses.domains) console.log(`  \t      Domains: ${subsenses.domains.join()}`)
}

function getExmaples(ex) {
  let index = 0
  let array = []
  for (x of ex) {
    if (x.text) {
      index = index + 1
      array.push([`(${index})`, x.text].join(''))
    }
  }
  return array
}
