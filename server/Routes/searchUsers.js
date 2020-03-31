const {
  Types: {
    ObjectId,
  },
} = require('mongoose');
const User = require('../Models/User');
const { SUCCESS, ERROR } = require('../utils');

module.exports = async (req, res) => {
  try {
    const { q } = req.body;
    const cleanQuery = q.replace(/\W/g, '');
    const foundUsers = await User.find({
      $or: [
        {
          email: {
            $regex: new RegExp(cleanQuery),
          },
        },
        {
          username: {
            $regex: new RegExp(cleanQuery),
          },
        },
      ],
      _id: {
        $ne: ObjectId(req.user._id),
      },
    }, {
      password: 0,
      privateSignKey: 0,
      privateRSAKey: 0,
    });

    return res.json({
      ...SUCCESS,
      users: foundUsers,
    });
  } catch (e) {
    console.log(e); // eslint-disable-line
    return res.json({
      ...ERROR,
    });
  }
};
