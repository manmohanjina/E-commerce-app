const express = require("express");
const { CatagoryModel } = require("../models/catagory.model");
const { validator, isAdmin } = require("../validatorM.D/valimiddleware");
const catagoryRouter = express.Router();

// catagoryRouter.use(validator, isAdmin);

catagoryRouter.post("/createcatagory", validator, isAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(401).send({ err: "catagory name is required" });
    }

    const catagory = await new CatagoryModel({ name }).save();
    res.status(201).send({ msg: "new catagory added", catagory });
  } catch (error) {
    res.status(500).send({ err: "err in posting catagory" });
  }
});

//update catagory;

catagoryRouter.put(
  "/updatecatagory/:id",
  validator,
  isAdmin,
  async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.params;

      let catagory = await CatagoryModel.findByIdAndUpdate(
        id,
        { name: name },
        { new: true }
      );
      await catagory.save();

      res.status(200).send({ succ: "catgagory updated success", catagory });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "cannot update catagory" });
    }
  }
);

//get all catagory;

catagoryRouter.get("/getcatagory", async (req, res) => {
  try {
    let catagory = await CatagoryModel.find();

    res.status(200).send({ msg: "success get", catagory });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "cannot get catagory", error });
  }
});

//single catagory;

catagoryRouter.get("/singlecatagory/:id", async (req, res) => {
  //we are finding single catagory by its's id
  try {
    const { id } = req.params.id;

    let single_cata = await CatagoryModel.findOne({ id });
    console.log(single_cata);
    res.status(200).send({ msg: "succ", single_cata });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "cannot get single catagory", error });
  }
});

//delete catagory;

catagoryRouter.delete(
  "/deletecatagory/:id",
  validator,
  isAdmin,
  async (req, res) => {

    try {
      const  id  = req.params.id;
    
      const del = await CatagoryModel.findByIdAndDelete(id);
     
      res.status(200).send({ success: `deleted catagory with ${id} success ` });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "cannot delete catagory" });
    }
  }
);

module.exports = {
  catagoryRouter,
};
