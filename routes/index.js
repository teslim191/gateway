const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const registry = require("./registry.json");
const fs = require("fs");

router.get("/:apiname/:path", (req, res) => {
  if (registry.services[req.params.apiname]) {
    axios({
      method: req.method,
      url: registry.services[req.params.apiname].url + req.params.path,
      headers: req.headers,
      data: req.body,
    }).then((response) => {
      res.json(response.data);
    });
  } else {
    res.json({ error: "api does not exist" });
  }
});

router.post("/register", (req, res) => {
  const regInfo = req.body;
  registry.services[regInfo.apiName] = { ...regInfo };
  fs.writeFile("./routes/registry.json", JSON.stringify(registry), (err) => {
    if (err) {
      res.json({ error: "could not register API" });
    } else {
      fs.appendFile(
        "./routes/registry.json",
        JSON.stringify(registry),
        (err) => {
          if (err) throw err;
          res.json({ msg: "successfully registered API" });
        }
      );
    }
  });
});

module.exports = router;
