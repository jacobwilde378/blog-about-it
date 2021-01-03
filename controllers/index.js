const router = require('express').Router()

const apiRoutes = require('./api/')
const landingRoutes = require('./landing-routes.js')
const dashboardRoutes = require('./dashboard-routes.js')

router.use('/', landingRoutes);
router.use('/dashboard', dashboardRoutes)
router.use('/api', apiRoutes)

module.exports = router;