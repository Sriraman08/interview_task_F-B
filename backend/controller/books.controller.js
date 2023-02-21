const book = require('../model/books');
const journal = require('../model/journal');



const bookController = () => {
    const create = async (req, res) => {
        try {
            const userInput = req.file;
            const input = {};
            input.books = userInput.originalname
            input.size = userInput.size
            input.path = userInput.path
            input.image_type = userInput.mimetype.split('/')[1]
            console.log(input.image_type, "input.image_type")
            if (input.image_type === 'jpeg') {
                input.image_type = 'jpg'
            }
            if (input.image_type === 'jpg' || input.image_type === 'png' || input.image_type === 'jpeg') {
                await book.create(input).then(resp => {
                    if (resp) {
                        return res.status(201).json({
                            message: "Success"
                        })
                    }
                }).catch(err => {
                    console.log(err, "error in catch:")
                    if (err.code === 11000) {
                        return res.status(500).json({
                            message: "Already Exist"
                        })
                    }
                    return res.status(500).json({
                        message: err
                    })
                })
            } else {
                return res.status(405).json({
                    message: "File Not Allowed"
                })
            }
        } catch (err) {
            console.log(err, "error in catch:")
            return res.json({
                statuscode: 500,
                message: err
            })
        }
    }
    const list = async (req, res) => {
        try {
            const bookData = await book.find();
            return res.status(200).json({
                message: 'success',
                data: bookData
            })
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }

    const graphData = async (req, res) => {
        try {
            const booksCount = await book.aggregate([
                {
                    $group: {
                        _id: "$image_type",
                        count: { $sum: 1 }
                    }
                }
            ])
            console.log(booksCount, "book-=-=--=-")
            const journalCount = await journal.aggregate([
                {
                    $group: {
                        _id: "$image_type",
                        count: { $sum: 1 }
                    }
                }
            ]);
            console.log(journalCount, "journal-=-=-=-=")
            let result = { book: [], journal: [] }

            await booksCount.forEach((data, index) => {
                console.log(data, "booksCount===")

                let obj = {}
                obj['title'] = data._id
                obj['value'] = data.count
                if (index == 0) {
                    obj['color'] = '#E38627'
                } else {
                    obj['color'] = '#C13C37'
                }
                result.book.push(obj)
            })
            await journalCount.forEach((data, index) => {
                console.log(data, "journalCount===")

                let obj = {}
                obj['title'] = data._id
                obj['value'] = data.count
                console.log(index, "index===")
                if (index == 0) {
                    obj['color'] = '#E38627'
                } else {
                    obj['color'] = '#C13C37'
                }
                result.journal.push(obj)
            })

            return res.status(200).json({
                message: "Success",
                data: result
            })
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }

    return {
        create,
        list,
        graphData
    }
}

module.exports = bookController();