import express from 'express';
import { validateHeaderValue } from 'node:http';  
import cookieParser from "cookie-parser";
import settings from "./models/settings.js";
import battles from "./models/battles.js";

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());




function settingsLocals(req, res, next) {
  res.locals.app = settings.getSettings(req);
  res.locals.page = req.path;
  next();
}
app.use(settingsLocals);

const settingsRouter = express.Router();
settingsRouter.use("/toggle-theme", settings.themeToggle);


settingsRouter.use("/accept-cookies", settings.acceptCookies);
settingsRouter.use("/decline-cookies", settings.declineCookies);
settingsRouter.use("/manage-cookies", settings.manageCookies);
app.use("/settings", settingsRouter);






















app.use(log_request);

function log_request(req, res, next) {
  console.log(`Request ${req.method} ${req.path}`);
  next();
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

app.get("/", (req, res) => {
  res.render("main_page", {
    title: "TEST",
    battles: battles.Get_All_Battles(),
  });
    console.log(battles.Get_All_Battles());
    
});


app.get("/battle/:id", (req, res) => {
  const id = req.params.id;
  const battle = battles.Get_Battle_By_Id(id);
  if (battle) {
    res.render("article.ejs", {
      title: "Nowy artykuł",
      battle: battle
    });
  } else {
    res.status(404).send("Battle not found");
  }
});

 
app.get('/search', (req, res) => {
  let query = req.query.q;
  query = normalizeText(query);

  let all_battles = battles.Get_All_Battles();

  let results = all_battles.filter(battle => 
    normalizeText(battle.name).includes(query)
  );

  console.log("Rezultaty ", results);

  res.render("search_results", {
    title: "Wyniki wyszukiwania",
    results: results
  });
});


//edycja
app.post("/battle/:id/edit", (req, res) => {
  const id = req.params.id;
  battles.Update_Battle_By_Id(
    id,
    req.body.name,
    req.body.year,
    req.body.description
  );
  res.redirect(`/battle/${id}`);
});



//nowy
app.post("/battle/new", (req, res) => {

battles.Insert_Battle(
  req.body.name,
  req.body.year,
  req.body.description  
);
  res.redirect("/");
});

//usuń
app.post("/battle/:id/delete", (req, res) => {
  const id = req.params.id;
  battles.Delete_Battle_By_Id(id);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log('Serwer działa');
});