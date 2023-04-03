// const jwt = require('jsonwebtoken');
const Preference = require("../model/preference");
module.exports = {
  add: async function (req, res) {
    try {
      console.log(req.body);
      let data = req.body;
      const tokenData = req.headers.decodedToken;

      if (!data.type) {
        return res.status(400).json({ status: 400, message: "type required" });
      }

      let createData = {
        type: data.type,
        createdAt: Math.floor(Date.now() / 1000),
        updatedAt: Math.floor(Date.now() / 1000),
        createdBy: tokenData.id,
        updatedBy: tokenData.id,
      };

      //find duplicate
      let findUser = await Preference.count({
        type: createData.type,
        isActive: true,
        isDeleted: false,
      });
      if (findUser) {
        return res
          .status(400)
          .json({ status: 400, message: "preference already exist" });
      }

      let create = await Preference.create(createData);
      return res.status(200).json({ status: 200, data: create });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: error.msg,
        message: "server error",
      });
    }
  },

  get: async function (req, res) {
    try {
      let getPreferences = await Preference.find({
        isDeleted: false,
        isActive: true,
      }).exec();

      return res.status(200).json({ status: 200, data: getPreferences });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 500, err: error });
    }
  },

  update: async function (req, res) {
    try {
      let id = req.query.id;
      const tokenData = req.headers.decodedToken;
      let data = req.body;
      let getPreferences = await Preference.findByIdAndUpdate(
        { _id: id, isDeleted: false, isActive: true },
        {
          $set: {
            type: data.type,
            updatedAt: Math.floor(Date.now() / 1000),
            updatedBy: tokenData.id,
          },
        },{new:true}
      );

      return res.status(200).json({ status: 200, data: getPreferences });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 500, err: error });
    }
  },
};
