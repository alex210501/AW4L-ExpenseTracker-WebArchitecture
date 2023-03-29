const generateUUID = require('../services/uuid')
const Category = require('../models/category')
const Message = require('../models/message')


class CategoryController {
    static getCategories(req, res) {
        const spaceId = req.params.space_id

        Category.findAll({ where: { category_space: spaceId} })
            .then(result => res.json(result))
            .catch(err => res.status(500).json(new Message(err)))
    }

    static createCategory(req, res) {
        const spaceId = req.params.space_id
        const { category_title } = req.body

        Category.create({
            category_id: generateUUID(),
            category_title,
            category_space: spaceId
        }).then(result => res.json(result))
            .catch(err => res.status(500).json(new Message(err)))
    }

    static deleteCategory(req, res) {
        const spaceId = req.params.space_id
        const categoryId = req.params.category_id

        Category.destroy({ 
            where: { category_id: categoryId, category_space: spaceId } 
        }).then((result) => {
            if (result == 0) {
                res.status(404).json(new Message(`Category ${categoryId} does not exists!`))
            } else {
                res.json(result)
            }
        }).catch(err => res.status(500).json(new Message(err)))
    } 
}

module.exports = CategoryController