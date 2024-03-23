const db = require('../orm/models/index')
const CategoryController = {
    getAllCategory: async (req, res) => {
        try {
            const category = await db.Category.findAll({
                attributes:['id','name','description']
            })
            res.status(200).json(category)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    //admin
    updateCategory: async (req,res)=>{
        const {categoryId} = req.params
        const {name, description} = req.body
        try {
            const category = await db.Category.update(
                {name,description},
                {where:{id:categoryId}}
            )
        res.status(200).json({message:'Category updated successfully'})
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    deleteCategory: async (req,res)=>{
        const {categoryId} = req.params
        try {
             await db.Category.destroy(
                {where:{id:categoryId}}
            )
        res.status(200).json({message:'Category deleted successfully'})
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    createCategory: async (req,res)=>{
        const {name, description} = req.body
        try {
             await db.Category.create({name,description})
        res.status(200).json({message:'Category created successfully'})
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getOneCategory: async (req, res) => {
        const {categoryId} = req.params
        try {
            const category = await db.Category.findOne({
                where:{id:categoryId},
                attributes:['id','name','description']
            })
            res.status(200).json(category)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = CategoryController;