const express = require('express')
const router = express.Router()
var err = false;

var NotifyClient = require('notifications-node-client').NotifyClient,
    notify = new NotifyClient(process.env.NotifyKey);


// Add your routes here - above the module.exports line

router.get('/', (req, res) => {
    req.session.data = {}

    res.render('index')
})


router.post('/register', (req, res) => {

    err = false;
    var err_first_name = false;
    var err_last_name = false;


    if (req.body['first-name'] === "") {
        err = true;
        err_first_name = true;
    }

    if (req.body['last-name'] === "") {
        err = true;
        err_last_name = true;
    }

    if (req.session.cya === 'y') {
        res.redirect('register-check')
    } else {

        if (err) {
            res.render('register', {
                err,
                err_first_name,
                err_last_name
            })
        } else {

            res.redirect('register-profile')
        }
    }
})

router.post('/register-profile', (req, res) => {

    err = false;
    var describe = false;

  
    if (req.body['describe'] === undefined) {
        err = true;
        describe = true;
    }



    if (req.session.cya === 'y') {
        res.redirect('register-check')
    } else {
        if (err) {
            res.render('register-profile', {
                err,
                describe
            })
        } else {

            res.redirect('register-gambling')
        }
    }
})



router.post('/register-gambling', (req, res) => {
    err = false;
    var licensed = false;

  
    if (req.body['licensed'] === undefined) {
        err = true;
        licensed = true;
    }



    if (req.session.cya === 'y') {
        res.redirect('register-check')
    } else {
        if (err) {
            res.render('register-gambling', {
                err,
                licensed
            })
        } else {
            res.redirect('register-contact')
        }
    }
})

router.post('/register-contact', (req, res) => {
    err = false;
    var err_email = false;
    var err_telephone_number = false;


    if (req.body['email'] === "") {
        err = true;
        err_email = true;
    }

    if (req.body['telephone-number'] === "") {
        err = true;
        err_telephone_number = true;
    }

    if (req.session.cya === 'y') {
        res.redirect('register-check')
    } else {

        if (err) {
            res.render('register-contact', {
                err,
                err_email,
                err_telephone_number
            })
        } else {

            res.redirect('register-optional')
        }
    }
})

router.post('/register-optional', (req, res) => {

    res.redirect('register-check')
})

router.get('/register-check', (req, res) => {
    req.session.cya = 'y';

    res.render('register-check')
})

router.post('/register-check', (req, res) => {


    // Send notification
    notify
    .sendEmail(process.env.newregistrationemail, process.env.recipient, {
       personalisation: {
        'first-name': req.body['first-name'],        
        'last-name': req.body['last-name'],    
        'describe': req.body['describe'],    
        'licensed': req.body['licensed'],    
        'email': req.body['email'],    
        'telephone-number': req.body['telephone-number'],
        'disabled': req.body['disabled'],
        'more-detail': req.body['more-detail']
      }
    })
    .then(response => console.log(response))
    .catch(err => console.error(err))

    notify
    .sendEmail(process.env.useremail, req.body['email'], {
       personalisation: {
        'first-name': req.body['first-name']
      }
    })
    .then(response => console.log(response))
    .catch(err => console.error(err))

    req.session.data = {}
    res.redirect('register-complete')
})

router.get('/register-complete', (req, res) => {
    req.session.data = {}

    res.render('register-complete')
})

module.exports = router