const {Fields} = require("../config.json")

module.exports.getFields = async (req, res) => {
    return res.status(200).json(Fields);
}