var config = require('../config');
const sql = require('mssql');

async function getContact(id) {
    let sqlResult = {};
    sql.close()
    await sql.connect(config)

    let q = get(id); 

    sqlResult['contact'] = await q;

    sql.close()
    return sqlResult;
}

    async function get(id) {
        try {
            return await sql.query("SELECT * FROM Participants WHERE participantid = " + id);
        } catch (err) {
            console.log(err);
        }
    }


module.exports = getContact;