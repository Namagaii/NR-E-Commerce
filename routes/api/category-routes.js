const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  console.log("Get: /api/categories/");
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  console.log("Get: /api/categories/:id");
  try {
    const categoryData = await Category.findOne({
      where: { id: req.params.id },
      include: { model: Product }
    })
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  console.log("Post: /api/categories/");
  try{
    const category = await Category.create({category_name: req.body.category_name})
    category.message = 'New entry created successfully.'
    res.status(200).json(category);
  } catch (error){
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  console.log("Put: /api/categories/:id");
  try {
    await Category.update({category_name: req.body.category_name}, {where: {id: req.params.id}});
    res.status(200).json({message:'Updated'})
  } catch (error){
    console.error(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  console.log("Delete: /api/categories/:id");
  try {
    await Category.destroy({where: {id: req.params.id}});
    res.status(200).json({
      message: 'Deletion Successfull'
    })
  } catch (error) {
    res.status(500).json({message: 'Deletion Failed'});
    console.log(error);
  }
});

module.exports = router;
