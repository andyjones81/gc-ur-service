var config = require('../config');
const sql = require('mssql');

async function searchContacts(query) {
    let sqlResult = {};
    sql.close()
    await sql.connect(config)

    let q = get(query); 

    sqlResult['contacts'] = await q;

    sql.close()
    return sqlResult;
}

    async function get(query) {
        try {
            return await sql.query("SELECT * FROM Participants WHERE firstname like '%" + query + "%' or lastname like '%"+ query +"%' or email like '%"+ query +"%' order by firstname");
        } catch (err) {
            console.log(err);
        }
    }


module.exports = searchContacts;