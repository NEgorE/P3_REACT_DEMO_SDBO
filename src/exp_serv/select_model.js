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

    const currFilter1_array2 = currFilter1.split(',').map(item => "'" + item + "'")
    const select_q_with_param =  `select * from dbo.monthly_data_mart where date_yq in (${currFilter1_array2}) order by 1 asc `;

    pool.query(select_q_with_param, (error, results) => {
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

function selectMauBySegmentByFilters(currFilter1) {
  return new Promise(function (resolve, reject) {

    const currFilter1_array2 = currFilter1.split(',').map(item => "'" + item + "'")
    const select_q_with_param =  `select * from dbo.monthly_data_mart_by_segment_3 where date_yq in (${currFilter1_array2}) order by 1 asc `;

    pool.query(select_q_with_param, (error, results) => {
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

function selectMauBySystemByFilters(currFilter1) {
  return new Promise(function (resolve, reject) {

    const currFilter1_array2 = currFilter1.split(',').map(item => "'" + item + "'")
    const select_q_with_param =  `SELECT *, case sys_type when 'Android' then '#a4c639' when 'iOS' then '#8e8e93' else '#007AFF' end as COLOR FROM dbo.mau_dau_by_systems_1 where date_year_month = (select max(date_year_month) from dbo.mau_dau_by_systems_1 where date_yq in (${currFilter1_array2})) order by 1 desc, 2 desc`;

    pool.query(select_q_with_param, (error, results) => {
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

function selectServicesCount(currFilter1) {
  return new Promise(function (resolve, reject) {

    if ( currFilter1.length > 0 ) {
      const currFilter1_array2 = currFilter1.split(',').map(item => "'" + item + "'")
      var select_q =  `select ser_name as name, sum(count_ser) as size from dbo.services_data_mart_1 where date_yq in (${currFilter1_array2}) group by ser_name order by 2 desc`;
    }
    else {
      var select_q =  'select ser_name as name, sum(count_ser) as size  from dbo.services_data_mart_1 group by ser_name order by 2 desc';
    }

    pool.query(select_q, (error, results) => {
      if (error) {
        reject('Some error')
      }
      resolve(results.rows);
    })
  });
}

function selectServicesCountBySystem(currFilter1) {
  return new Promise(function (resolve, reject) {

    if ( currFilter1.length > 0 ) {
      const currFilter1_array2 = currFilter1.split(',').map(item => "'" + item + "'")
      var select_q =  `select date_year_month, sys_type, sum(count_ser) as size, case sys_type when 'Android' then '#a4c639' when 'iOS' then '#8e8e93' else '#007AFF' end as COLOR from dbo.services_data_mart_1 where date_yq in (${currFilter1_array2}) group by sys_type, date_year_month order by 1 desc, 2 desc`;
    }
    else {
      var select_q =  `select date_year_month, sys_type, sum(count_ser) as size, case sys_type when 'Android' then '#a4c639' when 'iOS' then '#8e8e93' else '#007AFF' end as COLOR from dbo.services_data_mart_1 group by sys_type, date_year_month order by 1 desc, 2 desc`;
    }

    pool.query(select_q, (error, results) => {
      if (error) {
        reject('Some error')
      }
      resolve(results.rows);
    })
  });
}

function selectServicesCountByUsedByClients(currFilter1) {
  return new Promise(function (resolve, reject) {

    if ( currFilter1.length > 0 ) {
      const currFilter1_array2 = currFilter1.split(',').map(item => "'" + item + "'")
      var select_q =  `
      select 
        t1.*,
        t2.count_ser_date
      from
      (
        select 
        s1.ser_name,
          count(distinct s1.cl_id) AS count_ser_used
        from dbo.services_data_mart_2_1 s1
        where date_yq in (${currFilter1_array2}) 
        GROUP BY s1.ser_name
      ) t1 left join
        (select 
        s2.ser_name,
        count(s2.date_id) AS count_ser_date
        from dbo.services_data_mart_2_2 s2
        where date_yq in (${currFilter1_array2}) 
        GROUP BY s2.ser_name
        ) t2 on t1.ser_name=t2.ser_name
    `;
    }
    else {
      var select_q =  `
        select 
          t1.*,
          t2.count_ser_date
        from
        (
          select 
          s1.ser_name,
            count(distinct s1.cl_id) AS count_ser_used
          from dbo.services_data_mart_2_1 s1
          GROUP BY s1.ser_name
        ) t1 left join
          (select 
          s2.ser_name,
          count(s2.date_id) AS count_ser_date
          from dbo.services_data_mart_2_2 s2
          GROUP BY s2.ser_name
          ) t2 on t1.ser_name=t2.ser_name
      `;
    }

    pool.query(select_q, (error, results) => {
      if (error) {
        reject('Some error')
      }
      resolve(results.rows);
    })
  });
}

function selectDailyServices(currFilter1) {
  return new Promise(function (resolve, reject) {

    if ( currFilter1.length > 0 ) {
      const currFilter1_array2 = currFilter1.split(',').map(item => "'" + item + "'")
      var select_q =  `select * from dbo.services_daily_data_mart_1 where date_yq in (${currFilter1_array2})  order by 1`;
    }
    else {
      var select_q =  `select * from dbo.services_daily_data_mart_1 order by 1`;
    }

    pool.query(select_q, (error, results) => {
      if (error) {
        reject('Some error')
      }
      resolve(results.rows);
    })
  });
}

function selectSessionsChart13(currFilter1) {
  return new Promise(function (resolve, reject) {

    if ( currFilter1.length > 0 ) {
      const currFilter1_array2 = currFilter1.split(',').map(item => "'" + item + "'")
      var select_q =  `select * from dbo.sessions_datamart_chart_13 where date_yq in (${currFilter1_array2})  order by 2`;
    }
    else {
      var select_q =  `select * from dbo.sessions_datamart_chart_13 order by 2`;
    }

    pool.query(select_q, (error, results) => {
      if (error) {
        reject('Some error')
      }
      resolve(results.rows);
    })
  });
}

function selectSessionsChart12(currFilter1) {
  return new Promise(function (resolve, reject) {

    if ( currFilter1.length > 0 ) {
      const currFilter1_array2 = currFilter1.split(',').map(item => "'" + item + "'")
      var select_q =  `select * from dbo.sessions_datamart_chart_12 where date_yq in (${currFilter1_array2})  order by 2 desc, 3`;
    }
    else {
      var select_q =  `select * from dbo.sessions_datamart_chart_12 order by 2 desc, 3`;
    }

    pool.query(select_q, (error, results) => {
      if (error) {
        reject('Some error')
      }
      resolve(results.rows);
    })
  });
}

function selectSessionsChart11(currFilter1) {
  return new Promise(function (resolve, reject) {

    if ( currFilter1.length > 0 ) {
      const currFilter1_array2 = currFilter1.split(',').map(item => "'" + item + "'")
      var select_q =  `select *, case sys_type when 'Android' then '#a4c639' when 'iOS' then '#8e8e93' else '#007AFF' end as COLOR from dbo.sessions_datamart_chart_11 where date_yq in (${currFilter1_array2})  order by 2 desc, 3`;
    }
    else {
      var select_q =  `select *, case sys_type when 'Android' then '#a4c639' when 'iOS' then '#8e8e93' else '#007AFF' end as COLOR from dbo.sessions_datamart_chart_11 order by 2 desc, 3`;
    }

    pool.query(select_q, (error, results) => {
      if (error) {
        reject('Some error')
      }
      resolve(results.rows);
    })
  });
}

function selectSessionsKpi3(currFilter1) {
  return new Promise(function (resolve, reject) {

    if ( currFilter1.length > 0 ) {
      const currFilter1_array2 = currFilter1.split(',').map(item => "'" + item + "'")
      var select_q =  `
                      SELECT 
                        dm13.date_yq, 
                        cc.date_year_month,
                        avg(dm13.proc_success_session)::numeric(8,1) as avg_succ_sess
                      FROM dbo.sessions_datamart_chart_13 dm13
                      left join dbo.csv_cal cc on cc.date_id=dm13.date_id
                      where dm13.date_yq in (${currFilter1_array2})
                      group by 
                        dm13.date_yq, 
                        cc.date_year_month
                      order by 2 desc;
                      `;
    }
    else {
      var select_q =  `
                      SELECT 
                        dm13.date_yq, 
                        cc.date_year_month,
                        avg(dm13.proc_success_session)::numeric(8,1) as avg_succ_sess
                      FROM dbo.sessions_datamart_chart_13 dm13
                      left join dbo.csv_cal cc on cc.date_id=dm13.date_id
                      group by 
                        dm13.date_yq, 
                        cc.date_year_month
                      order by 2 desc;
                      `;
    }

    pool.query(select_q, (error, results) => {
      if (error) {
        reject('Some error')
      }
      resolve(results.rows);
    })
  });
}

function selectSessionsKpi4(currFilter1) {
  return new Promise(function (resolve, reject) {

    if ( currFilter1.length > 0 ) {
      const currFilter1_array2 = currFilter1.split(',').map(item => "'" + item + "'")
      var select_q =  `
                      select * from dbo.sessions_datamart_kpi4
                      where date_yq in (${currFilter1_array2})
                      order by 2 desc;
                      `;
    }
    else {
      var select_q =  `
                      select * from dbo.sessions_datamart_kpi4
                      order by 2 desc;
                      `;
    }

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
    selectMauByFilters,
    selectMauBySegmentByFilters,
    selectMauBySystemByFilters,
    selectServicesCount,
    selectServicesCountBySystem,
    selectServicesCountByUsedByClients,
    selectDailyServices,
    selectSessionsChart13,
    selectSessionsChart12,
    selectSessionsChart11,
    selectSessionsKpi3,
    selectSessionsKpi4
  }