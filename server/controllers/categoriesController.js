const mongoose = require('mongoose');
const Categories = mongoose.model('categories');

exports.getCategories = async (req, res) => {
    try {
        const categories = await Categories.find({});
        res.send(categories);
        res.status(200).json({
          body: "Hello, world!",
          headers: {
            "access-control-allow-origin": "*",
          },
      });
      } catch (err) {
        console.log(err);
      }
};
