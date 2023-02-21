const journal = require('../model/journal');


const journalController = ()=>{
    const create = async (req,res)=>{
        try{
            const userInput = req.file;
            const input = {};
            input.journals = userInput.originalname
            input.size = userInput.size
            input.path = userInput.path
            input.image_type = userInput.mimetype.split('/')[1]
            console.log(input.image_type,"input.image_type")
            if(input.image_type === 'jpeg'){
                input.image_type = 'jpg'
            }
            if(input.image_type === 'jpg' || input.image_type === 'png' || input.image_type === 'jpeg'){
            await journal.create(input).then(resp=>{
                if(resp){
                    return res.status(201).json({
                        message: "Success"
                    })
                }
            }).catch(err=>{
                if(err.code === 11000){
                    return res.status(500).json({
                        message: "Already Exist"
                    })
                }
                return res.status(500).json({
                    message: err
                })
            })
        }else{
            return res.status(405).json({
                message: "File Not Allowed"
            })
        }
        }catch(err){
            return res.status(500).json({
                statuscode: 500,
                message: err
            })
        }
    }
    const list = async (req,res)=>{
        try{
            const journalData = await journal.find();
            return res.status(200).json({
                message: 'success',
                data: journalData
            })
        }catch(err){
            return res.status(500).json({
                message: err
            })
        }
    }

    return {
        create,
        list
    }
}

module.exports = journalController();