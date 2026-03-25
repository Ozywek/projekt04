import express from 'express';
import cookieParser from "cookie-parser";
import settings from "./models/settings.js";
import battles from "./models/battles.js";
import session from "./models/session.js";
import auth from "./controller/auth.js";
import user from "./models/user.js";

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(session.sessionHandler);

function settingsLocals(req, res, next) {
  res.locals.app = settings.getSettings(req);
  res.locals.page = req.path;
  res.locals.user = res.locals.user || null;
  next();
}
app.use(settingsLocals);

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
    const isAuthor = res.locals.user && res.locals.user.id === battle.author_id;
    const isAdmin = res.locals.user && res.locals.user.is_admin === true;
    const author = user.getUser(battle.author_id);
    res.render("article.ejs", {
      title: battle.name,
      battle: battle,
      author: author,
      isAuthor: isAuthor || isAdmin
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

app.post("/battle/:id/edit", auth.login_required, (req, res) => {
  const id = req.params.id;
  const battle = battles.Get_Battle_By_Id(id);

  if (!battle) {
    res.status(404).send("Battle not found");
    return;
  }
    const name = req.body.name?.trim();
    const year = req.body.year?.trim();
    const description = req.body.description?.trim();
    if (
        !name ||
        !year ||
        !description ||
        isNaN(year)
    ) {
      res.status(400).send("Bad Request");
    } else {
      const isAuthor = res.locals.user.id === battle.author_id;
      const isAdmin = res.locals.user.is_admin === true;

  if (!isAuthor && !isAdmin) {
    res.status(403).send("You can only edit your own battles");
    return;
  }

  battles.Update_Battle_By_Id(
    id,
    req.body.name,
    req.body.year,
    req.body.description,
    battle.author_id
  );
  res.redirect(`/battle/${id}`);
  }
});

app.post("/battle/new", auth.login_required, (req, res) => {
    const name = req.body.name?.trim();
    const year = req.body.year?.trim();
    const description = req.body.description?.trim();
    if (
        !name ||
        !year ||
        !description ||
        isNaN(year)
    ) {
      res.status(400).send("Bad Request");
    } else {
      battles.Insert_Battle(
        req.body.name,
        req.body.year,
        req.body.description,
        res.locals.user.id
      );
    }
  res.redirect("/");

});


app.post("/battle/:id/delete", auth.login_required, (req, res) => {
  const id = req.params.id;
  const battle = battles.Get_Battle_By_Id(id);

  if (!battle) {
    res.status(404).send("Battle not found");
    return;
  }

  const isAuthor = res.locals.user.id === battle.author_id;
  const isAdmin = res.locals.user.is_admin === true;

  if (!isAuthor && !isAdmin) {
    res.status(403).send("You can only delete your own battles");
    return;
  }

  battles.Delete_Battle_By_Id(id);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log('Serwer działa');
});