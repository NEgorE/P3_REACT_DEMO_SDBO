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

app.get('/select_mau_by_filters/:currFilter1', (req, res) => {
  select_model.selectMauByFilters(req.params.currFilter1.replace('filter1=', ''))
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
app.get('/select_mau_by_segment_by_filters/:currFilter1', (req, res) => {
  select_model.selectMauBySegmentByFilters(req.params.currFilter1.replace('filter1=', ''))
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

app.get('/select_mau_by_system_by_filters/:currFilter1', (req, res) => {
  select_model.selectMauBySystemByFilters(req.params.currFilter1.replace('filter1=', ''))
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.send('Some error');
  })
})

app.get('/select_services_count/:currFilter1', (req, res) => {
  select_model.selectServicesCount(req.params.currFilter1.replace('filter1=', ''))
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.send('Some error');
  })
})

app.get('/select_services_count_by_system/:currFilter1', (req, res) => {
  select_model.selectServicesCountBySystem(req.params.currFilter1.replace('filter1=', ''))
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.send('Some error');
  })
})

app.get('/select_services_count_by_used_by_clients/:currFilter1', (req, res) => {
  select_model.selectServicesCountByUsedByClients(req.params.currFilter1.replace('filter1=', ''))
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.send('Some error');
  })
})

app.get('/select_daily_services/:currFilter1', (req, res) => {
  select_model.selectDailyServices(req.params.currFilter1.replace('filter1=', ''))
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.send('Some error');
  })
})

app.get('/select_session_chart13/:currFilter1', (req, res) => {
  select_model.selectSessionsChart13(req.params.currFilter1.replace('filter1=', ''))
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.send('Some error');
  })
})

app.get('/select_session_chart12/:currFilter1', (req, res) => {
  select_model.selectSessionsChart12(req.params.currFilter1.replace('filter1=', ''))
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.send('Some error');
  })
})

app.get('/select_session_chart11/:currFilter1', (req, res) => {
  select_model.selectSessionsChart11(req.params.currFilter1.replace('filter1=', ''))
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.send('Some error');
  })
})

app.get('/select_session_kpi3/:currFilter1', (req, res) => {
  select_model.selectSessionsKpi3(req.params.currFilter1.replace('filter1=', ''))
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.send('Some error');
  })
})

app.get('/select_session_kpi4/:currFilter1', (req, res) => {
  select_model.selectSessionsKpi4(req.params.currFilter1.replace('filter1=', ''))
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.send('Some error');
  })
})

app.get('/select_session_kpi5/:currFilter1', (req, res) => {
  select_model.selectSessionsKpi5(req.params.currFilter1.replace('filter1=', ''))
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.send('Some error');
  })
})

app.get('/select_comment_bar_data/', (req, res) => {
  select_model.selectCommentsBarChartsData()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.send('Some error');
  })
})

app.get('/select_comment_cloud_data/', (req, res) => {
  select_model.selectCommentsWCloudChartsData()
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