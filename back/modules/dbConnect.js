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
        logger.info(err)
    })
}

async function getList(mapperId, sqlId, param) {
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

module.exports = {
    getList: getList,
    setData: setData,
    getData: getData,
    delData: delData,
    test : test
}