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

function selectFilterCal() {
  return new Promise(function (resolve, reject) {

    const select_q =  'select distinct DATE_MONTH_NAME from dbo.csv_cal';

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
    selectMauBySegment
  }