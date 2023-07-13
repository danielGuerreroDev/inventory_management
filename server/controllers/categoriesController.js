const mongoose = require('mongoose');
const Categories = mongoose.model('categories');

exports.getCategories = async (req, res) => {
    try {
        const categories = await Categories.find({});
        res.send(categories);
        console.log('Hola 123');
      } catch (err) {
        console.log(err);
      }
};
