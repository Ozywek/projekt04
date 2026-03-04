import express from 'express';

const app = express();

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render("index", {
    title: "TEST",
    theme: "dark",
    lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis mi massa. Sed hendrerit mi non elit auctor, at posuere purus convallis. Nam tristique at metus in iaculis. Pellentesque hendrerit facilisis gravida. Sed posuere fermentum arcu sit amet mattis. Cras dignissim erat neque, et vestibulum tellus imperdiet scelerisque. Pellentesque turpis libero, vulputate in varius in, lacinia nec nibh. In elit felis, tempus quis efficitur vel, lacinia vel massa. Quisque dignissim consequat semper"

  });
});


app.listen(3000, () => {
  console.log('Serwer działa');
});