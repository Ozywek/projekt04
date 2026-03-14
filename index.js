import express from 'express';

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
    theme: "dark"

  });
});

app.get("/article_list", (req, res) => {
  res.render("article_list", {
    title: "Artykuły",
    lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis mi massa. Sed hendrerit mi non elit auctor, at posuere purus convallis. Nam tristique at metus in iaculis. Pellentesque hendrerit facilisis gravida. Sed posuere fermentum arcu sit amet mattis. Cras dignissim erat neque, et vestibulum tellus imperdiet scelerisque. Pellentesque turpis libero, vulputate in varius in, lacinia nec nibh. In elit felis, tempus quis efficitur vel, lacinia vel massa. Quisque dignissim consequat semper",
    theme: "dark"

  });
});



app.post("/article_list/3/new", (req, res) => {

  console.log("Bitwa:", req.body.bitwa);
  console.log("Data:", req.body.data);

  res.send("oki");
});

app.listen(3000, () => {
  console.log('Serwer działa');
});