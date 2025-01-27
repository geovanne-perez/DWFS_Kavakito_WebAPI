const { Router } = require('express')
const router = Router()


// API routes
router.get('/', (req, res) => {
    res.send('API running');
  });


module.exports = router;