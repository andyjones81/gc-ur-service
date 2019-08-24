var config = require('../config');
const sql = require('mssql');

async function getContacts() {
    let sqlResult = {};
    sql.close()
    await sql.connect(config)

    let q = get(); 

    sqlResult['contacts'] = await q;

    sql.close()
    return sqlResult;
}

    async function get() {
        try {
            return await sql.query("SELECT * FROM Participants ORDER BY FirstName");
        } catch (err) {
            console.log(err);
        }
    }


module.exports = getContacts;