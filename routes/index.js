const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get("/", (req, res) => {
  fs.readFile(
    path.join( __dirname, "../public/index.html"),
    (err, data) => {
      res.write(data);
      res.end();
    }
    );
  });
  
  router.get("/api", (req, res) => {
    let suggestions;
    console.log(req.query)
    const prefix = req.query.query[0];

    switch (prefix) {
      case 'i':
        suggestions = "../public/json/amazon_api-i.json";
        break;
      case 'j':
        suggestions = "../public/json/amazon_api-j.json";
        break;
      case 'b':
        suggestions = "../public/json/amazon_api-b.json";
        break;
    }

    fs.readFile(
      path.join( __dirname, suggestions),
      (err, data) => {
        res.write(data);
        res.end();
    }
  );
});

// router.get("/api-b/", (req, res) => {
//   fs.readFile(
//     path.join( __dirname, "../public/json/amazon_api-b.json"),
//     (err, data) => {
//       res.write(data);
//       res.end();
//     }
//   );
// });

// router.get("/api-j/", (req, res) => {
//   fs.readFile(
//     path.join( __dirname, "../public/json/amazon_api-j.json"),
//     (err, data) => {
//       res.write(data);
//       res.end();
//     }
//   );
// });

module.exports = router;