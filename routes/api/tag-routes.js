const router = require('express').Router();
const { json } = require('express/lib/response');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  console.log("Get: /api/tags/");
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    })
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  console.log("Get: /api/tags/:id");
  try {
    const tagData = await Tag.findOne({
      where: {id: req.params.id},
      include: [{model: Product}]
    })
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  console.log("Post: /api/tags/");
  try{
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  console.log("Put: /api/tags/:id");
  try{
    const tagData = await Tag.update({tag_name: req.body.tag_name}, {
      where: {id: req.params.id}
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500);
    console.log(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  console.log("Delete: /api/tags/:id");
  try {
    await Tag.destroy({where: {id: req.params.id}});
    res.status(200).json({
      message: 'Deletion successful'
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

module.exports = router;
