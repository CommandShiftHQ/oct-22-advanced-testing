const express = require('express')
const { checkStatus } = require('../controllers/health')

const router = express.Router()

router.get('/', checkStatus)

module.exports = router