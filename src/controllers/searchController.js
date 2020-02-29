import fs from "fs";
import path from "path";

export const getSearchData = (req, res) => {
  const {
    query: { term: prefix }
  } = req;
  const __dirname = path.resolve();
  const ABSOLUTE_PATH = ["src", "db", "search", `${prefix}.json`];
  const jsonPath = path.join(__dirname, ...ABSOLUTE_PATH);
  fs.readFile(jsonPath, "utf8", (err, data) => {
    err ? console.log(err) : res.end(data);
  });
};
