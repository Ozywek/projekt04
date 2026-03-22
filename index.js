import express from 'express';
import { validateHeaderValue } from 'node:http';  
import battles from "./models/battles.js";

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(log_request);

function log_request(req, res, next) {
  console.log(`Request ${req.method} ${req.path}`);
  next();
}


app.get("/main_page", (req, res) => {
  res.render("main_page", {
    title: "TEST",
    theme: "dark",
    battles: battles.Get_All_Battles(),
  });
    console.log(battles.Get_All_Battles());
    
});


app.get("/battle/new", (req, res) => {
  res.render("new_battle", {
    title: "Nowa bitwa",
    theme: "dark"
  });
});

app.get("/battle/:id", (req, res) => {
  const id = req.params.id;
  const battle = battles.Get_Battle_By_Id(id);
  if (battle) {
    res.render("article.ejs", {
      title: "Nowy artykuł",
      theme: "dark",
      battle: battle
    });
  } else {
    res.status(404).send("Battle not found");
  }
});




app.post("/battle/new", (req, res) => {

battles.Insert_Battle(
  req.body.name,
  req.body.year,
  req.body.description  
);
  res.redirect("/main_page");
});

app.listen(3000, () => {
  console.log('Serwer działa');
});