const autoBind = require("auto-bind")


module.exports = class controller {
    constructor(){
        autoBind(this)
    }
}