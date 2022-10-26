const Pool = require('pg').Pool
const pool = new Pool({
  user: 'for_py1',
  host: 'localhost',
  database: 'db_demo_sdbo',
  password: 'for_py1',
  port: 5432,
});

const getMerchants = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM dbo.csv_cal limit 10', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
    })
  }) 
}
function selectMerchants(count_sel) {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT date_id, date_day_num  FROM dbo.csv_cal limit $1', [count_sel], (error, results) => {
      if (error) {
        reject('Some error')
      }
      resolve(results.rows);
    })
  });
}

function selectMau() {
  return new Promise(function (resolve, reject) {

    const select_q =  'select * from dbo.monthly_data_mart order by 1 asc';

    pool.query(select_q, (error, results) => {
      if (error) {
        reject('Some error')
      }
      resolve(results.rows);
    })
  });
}

function selectMauByFilters(currFilter1) {
  return new Promise(function (resolve, reject) {

    console.log('currFilter1: ' + currFilter1)
    console.log('currFilter1 array: ' + currFilter1.split(','))

    const select_q =  'select * from dbo.monthly_data_mart order by 1 asc';

    pool.query(select_q, (error, results) => {
      if (error) {
        reject('Some error')
      }
      resolve(results.rows);
    })
  });
}

function selectMauBySegment() {
  return new Promise(function (resolve, reject) {

    const select_q =  'select * from dbo.monthly_data_mart_by_segment_3';

    pool.query(select_q, (error, results) => {
      if (error) {
        reject('Some error')
      }
      resolve(results.rows);
    })
  });
}

function selectMauBySystem() {
  return new Promise(function (resolve, reject) {

    const select_q =  "SELECT *, case sys_type when 'Android' then '#a4c639' when 'iOS' then '#8e8e93' else '#007AFF' end as COLOR FROM dbo.mau_dau_by_systems_1 where date_year_month = (select max(date_year_month) from dbo.mau_dau_by_systems_1) order by 1 desc, 2 desc";

    pool.query(select_q, (error, results) => {
      if (error) {
        reject('Some error')
      }
      resolve(results.rows);
    })
  });
}

function selectFilterCal() {
  return new Promise(function (resolve, reject) {

    const select_q =  'select distinct date_yq from dbo.csv_cal where date_year >= 2021 order by 1';

    pool.query(select_q, (error, results) => {
      if (error) {
        reject('Some error')
      }
      resolve(results.rows);
    })
  });
}

module.exports = {
    getMerchants,
    selectMerchants,
    selectMau,
    selectFilterCal,
    selectMauBySegment,
    selectMauBySystem,
    selectMauByFilters
  }