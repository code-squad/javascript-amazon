const port = 8080;
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const data = fs.readFileSync('localData.json', 'utf8');
const words = require('./words.js').words;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => res.send(data));
app.post('/', function(req, res) {
    const extractedWords = extractSuggestionWord(req.body.userInputText);
    res.send(extractedWords);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

function extractSuggestionWord(userInputText) {
    const extractedWords = [];

    for (let index = 0 ; index < words.length ; ++index) {
        if (extractedWords.length >= 10)
            break;

        const currentWord = words[index];

        if (currentWord.indexOf(userInputText) === 0) {
            extractedWords.push(currentWord);    
        }
    }

    return extractedWords;
}