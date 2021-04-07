const path = require('path');



module.exports = path.dirname(require.main.filename, 
    'data,', 
    'products.json');