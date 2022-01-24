const express = require('express');
const { englishLocales } = require('validator/lib/alpha');
const router  = express.Router()
const Category = require('../models/model.js')

const buildAncestors = async (id, parent_id) => {
    let ancest = [];
    try {
        let parent_category = await Category.findOne({ "_id":    parent_id },{ "name": 1, "slug": 1, "ancestors": 1 }).exec()
 if( parent_category ) {
           const { _id, name, slug } = parent_category
           const ancest = [...parent_category.ancestors]
           ancest.unshift({ _id, name, slug })
           const category = await Category.findByIdAndUpdate(id, { $set: { "ancestors": ancest } });
         }
      } catch (err) {
          console.log(err.message)
       }
 }

  router.post('/', async (req, res) => {
    const parent = req.body.parent ? req.body.parent : null;
    let level = 0
    if(req.body.parent === undefined)
        level = 0
    else
    {
        console.log(req.body)
        const user  =  await Category.findById(req.body.parent);
        console.log('hello')
        if(!user)
            return res.status(404).send({'error':'please provide a valid parent!'})
        console.log(user)
        level = user.level+1
    
    }
         let category = new Category({name: req.body.name, level: level, total:req.body.total , target:req.body.target, parent:parent});
         
    
  try {
    let newCategory = await category.save();
    buildAncestors(newCategory._id, parent)
    res.status(201).send({ response: `Category ${newCategory._id}` });
  } catch (err) {
    res.status(500).send(err);
  }
  });

  router.get('/', async (req, res) => {
    try {
        const result = await Category.find({ "ancestors._id":   req.query.category_id })
         .select({ "_id": false, "name": true })
         .exec();
       res.status(201).send({ "status": "success", "result": result });
       } catch (err) {
         res.status(500).send(err);
       }
    })

module.exports = router