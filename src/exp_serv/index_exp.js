const express = require('express')
const app = express()
const port = 3001

const select_model = require('./select_model')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  select_model.getMerchants()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/select_merchants/:count_sel', (req, res) => {
  select_model.selectMerchants(req.params.count_sel)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.send('Some error');
  })
})

app.get('/select_mau/', (req, res) => {
  select_model.selectMau()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.send('Some error');
  })
})

app.get('/select_filter_cal/', (req, res) => {
  select_model.selectFilterCal()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.send('Some error');
  })
})

app.get('/select_mau_by_segment/', (req, res) => {
  select_model.selectMauBySegment()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.send('Some error');
  })
})

app.get('/select_mau_by_system/', (req, res) => {
  select_model.selectMauBySystem()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.send('Some error');
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})