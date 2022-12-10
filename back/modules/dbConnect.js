const mariadb = require('mariadb');
const mapper = require('./mapperConfig');
const logger = require('./winstonConfig');


const pool = mariadb.createPool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

async function test() {
    pool.getConnection()
    .then(conn=>{
        logger.info(`success mariaDB connected ${process.env.HOST} ${process.env.PORT}`)
        conn.end();
    })
    .catch(err=>{
        logger.error(err)
    })
}

async function getList(mapperId, sqlId, param) {
    let conn, rows;
    try {
        conn = await pool.getConnection();
        var exeQuery = mapper.get(mapperId, sqlId, param);
        rows = await conn.query(exeQuery);
        rows = toCamel(rows);
    } catch (err) {
        console.log('@@@@@@@@@@@ error @@@@:', err);
    } finally {
        if (conn) conn.end();
        return rows;
    }
}

async function setData(mapperId, sqlId, param) {
    let conn, rows;
    try {
        conn = await pool.getConnection();
        var exeQuery = mapper.get(mapperId, sqlId, param);
        rows = await conn.query(exeQuery);
    } catch (err) {
        console.log('@@@@@@@@@@@ error @@@@:', err);
    } finally {
        if (conn) conn.end();
        return rows;
    }
}


async function getData(mapperId, sqlId, param) {
    let conn, rows;
    try {
        conn = await pool.getConnection();
        var exeQuery = mapper.get(mapperId, sqlId, param);
        rows = await conn.query(exeQuery);
        rows = toCamel(rows);
    } catch (err) {
        console.log('@@@@@@@@@@@ error @@@@:', err);
    } finally {
        if (conn) conn.end();
        return rows[0];
    }
}

async function delData(mapperId, sqlId, param) {
    let conn, rows;
    try {
        conn = await pool.getConnection();
        var exeQuery = mapper.get(mapperId, sqlId, param);
        rows = await conn.query(exeQuery);
    } catch (err) {
        console.log('@@@@@@@@@@@ error @@@@:', err);
    } finally {
        if (conn) conn.end();
        return true;
    }
}

function toCamel(o) {
    var newO, origKey, newKey, value
    if (o instanceof Array) {
      return o.map(function(value) {
          if (typeof value === "object") {
            value = toCamel(value)
          }
          return value
      })
    } else {
      newO = {}
      for (origKey in o) {
        if (o.hasOwnProperty(origKey)) {
            newKey = origKey.replace(/[-_]([a-z])/g, function (g) { return g[1].toUpperCase(); });
          value = o[origKey]
          if (value instanceof Array || (value !== null && value.constructor === Object)) {
            value = toCamel(value);
          }
          newO[newKey] = value
        }
      }
    }
    return newO
  }

module.exports = {
    getList: getList,
    setData: setData,
    getData: getData,
    delData: delData,
    test : test
}