const express = require('express');
const app = express();

let server = app.listen(process.env.PORT || '3000', () => {
  console.log("Make it happen")
});

//App Setting
app.use(express.static('client'))
app.set('views', './client/')
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index')
})
