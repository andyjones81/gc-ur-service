const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
var jsonexport = require('jsonexport');

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/internal', (req, res) => {

    const getContacts = require('./data/contacts/getContacts.js');

    let data = getContacts();

    data.then(contacts => {

        res.render('internal/index', {
            contacts
        });
    }).catch(err => {
        console.log(err);
    });;


})

router.get('/internal/contacts/', (req, res) => {

    const getContacts = require('./data/contacts/getContacts.js');

    let data = getContacts();

    data.then(contacts => {


        jsonexport(contacts.contacts.recordset, function (err, csv) {

            fs.writeFile(__dirname + "/contacts.csv", csv, function (err) {
                if (err) {
                    console.log(err)
                }
            });

        });


        res.render('internal/contacts/index', {
            contacts
        });
    }).catch(err => {
        console.log(err);
    });;
})

router.post('/internal/contacts/search', (req, res) => {

    console.log('search')

    const searchContacts = require('./data/contacts/searchContacts.js');
    var query = req.body.search
    let data = searchContacts(query);

    data.then(contacts => {
        res.render('internal/contacts/index', {
            contacts
        });
    }).catch(err => {
        console.log(err);
    });;
})

router.get('/internal/contacts/dl', (req, res) => {
    const file = __dirname + '/contacts.csv';
    res.download(file);
})

router.get('/internal/contacts/detail/:id', (req, res) => {

    var id = req.params.id;

    const getContact = require('./data/contacts/getContact.js');
    
    let data = getContact(id);

    data.then(contact => {
        res.render('internal/contacts/detail', {
            contact
        });
    }).catch(err => {
        console.log(err);
    });;
})

router.get('/internal/contacts/profile/:id', (req, res) => {

    var id = req.params.id;

    const getContact = require('./data/contacts/getContact.js');
    
    let data = getContact(id);

    data.then(contact => {
        res.render('internal/contacts/profile', {
            contact
        });
    }).catch(err => {
        console.log(err);
    });;
})


module.exports = router