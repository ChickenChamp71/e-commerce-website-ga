const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: { model: Product }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this ID.' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
    product_id: req.body.product_id
  })
  .then((category) => {
     res.status(200).json(category);
  })
  .catch((err) => {
    res.status(400).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = Category.destroy(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this ID.'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
