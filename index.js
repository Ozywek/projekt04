import express from 'express';
import { validateHeaderValue } from 'node:http';  
import battles from "./models/battles.js";

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


function log_request(req, res, next) {
  console.log(`Request ${req.method} ${req.path}`);
  next();
}
app.use(log_request);


app.get("/main_page", (req, res) => {
  res.render("main_page", {
    title: "TEST",
    theme: "dark",
      categories: battles.getBattleSummaries(),
  });
});

app.get("/:battle_id", (req, res) => {
  const battle = battles.getBattle(req.params.battle_id);
  if (battle) {
    res.render("category", {
      title: battle.name,
      year: battle.year,
      description: battle.description
    });
  } else {
    res.status(404).send("Battle not found");
  }
});


app.get("/battle/new", (req, res) => {
  res.render("new_battle", {
    title: "Nowa bitwa",
    theme: "dark"
  });
});

app.post("/battle/new", (req, res) => {

  const id = req.body.name.replace(/ /g,"_");
  //  "bitwa" + Date.now();

  battles.addBattle(id, {
    name: req.body.name,
    year: req.body.year,
    description: req.body.description
  });

  res.redirect("/main_page");
});

app.listen(3000, () => {
  console.log('Serwer działa');
});