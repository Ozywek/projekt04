import express from 'express';




const app = express();

app.set('view engine', 'ejs');



app.get("/", (req, res) => {
  res.render("index", {
    title: "TEST",
    theme: "dark"
  });
});


app.listen(3000, () => {
  console.log('Serwer działa');
});