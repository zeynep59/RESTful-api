const app = require('./app.js')
const config = require('../config.js')

const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`${config.app_name} started on port ${PORT}`);
});