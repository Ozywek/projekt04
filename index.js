import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import { validateHeaderValue } from 'node:http';  
import cookieParser from "cookie-parser";
import settings from "./models/settings.js";
import battles from "./models/battles.js";
import session from "./models/session.js";
import auth from "./controller/auth.js";



const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());




function settingsLocals(req, res, next) {
  res.locals.app = settings.getSettings(req);
  res.locals.page = req.path;
  res.locals.user = req.user || null;
  next();
}
app.use(settingsLocals);
app.use(session.sessionHandler);
const settingsRouter = express.Router();
settingsRouter.use("/toggle-theme", settings.themeToggle);


settingsRouter.use("/accept-cookies", settings.acceptCookies);
settingsRouter.use("/decline-cookies", settings.declineCookies);
settingsRouter.use("/manage-cookies", settings.manageCookies);
app.use("/settings", settingsRouter);

const authRouter = express.Router();
authRouter.get("/signup", auth.signup_get);
authRouter.post("/signup", auth.signup_post);
authRouter.get("/login", auth.login_get);
authRouter.post("/login", auth.login_post);
authRouter.get("/logout", auth.logout);
app.use("/auth", authRouter);


















function log_request(req, res, next) {
  console.log(`Request ${req.method} ${req.path}`);
  next();
}
app.use(log_request);

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
app.get("/", (req, res) => {
  res.render("main_page", {
    title: "Encyklopedia Bitew",
    battles: battles.Get_All_Battles_Limit(),
  });
    
});


app.get("/battle/:id", (req, res) => {
  const id = req.params.id;
  const battle = battles.Get_Battle_By_Id(id);
  if (battle) {
    res.render("article.ejs", {
      title: battle.name,
      battle: battle
    });
  } else {
    res.status(404).send("Battle not found");
  }
});

app.get('/search', (req, res) => {
  let query = req.query.q || '';
  query = normalizeText(query);

  let all_battles = battles.Get_All_Battles();

  let results = all_battles.filter(battle => 
    normalizeText(battle.name).includes(query)
  );

  console.log("Szukanie: ", query);
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