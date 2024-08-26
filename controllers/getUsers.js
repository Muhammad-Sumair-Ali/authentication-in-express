const User = require('../models/userData')

const getUsers = async (req, res) => {
    const users = await User.find();
    try {
        res.status(200).json({
                succces:true,
                data:users
            });
        
    }catch (error) {
     res.status(500).json({
        message: error.message
     })   
    }
}
module.exports = getUsers;