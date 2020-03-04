const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');
const app = express();
const data = require('./localData.json');
const words = require('./words.js').words;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => res.send(data));
app.post('/', (req, res) => {
    const extractedWords = extractSuggestionWord(req.body.userInputText);
    extractedWords.reverse();
    const suggestionData = {
        userInputText: req.body.userInputText,
        suggestionList: extractedWords
    };
    res.send(suggestionData);
});

function extractSuggestionWord(userInputText) {
    const extractedWords = [];
    let findMatchWord = false;

    for (let index = 0 ; index < words.length ; ++index) {
        if (extractedWords.length >= 10)
            break;

        const currentWord = words[index];

        if (currentWord.indexOf(userInputText) === 0) {
            findMatchWord = true;
            extractedWords.push(currentWord);    
        }
        else if (currentWord.indexOf(userInputText) !== 0 && findMatchWord) {
            break;
        }
    }

    return extractedWords;
}

const api1 = functions.https.onRequest(app)

module.exports = {
  api1
}