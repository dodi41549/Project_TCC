const Item = require('../models/model');

module.exports = {
    create: (req, res) => {
        const {name, description, quantity, price} = req.body;

        const item = new Item({
            name: name,
            description: description,
            quantity: quantity,
            price: price
        });

        Item.create(item, (err, data) => {
            if(err){
                return res.status(500).json({
                    status: false,
                    message: err.message,
                    data: null
                });
            }
            res.send(data);
        });
    },

    show: (req, res) => {
        Item.getAll((err, data) => {
            if(err){
                return res.status(500).json({
                    status: false,
                    message: err.message,
                    data: null
                });
            }
            res.send(data);
        });
    },

    update: (req, res) => {
        if (!req.body) {
            return res.status(400).send({
                status: false,
                message: "Content can not be empty!",
                data: null
            });
        }
        
        console.log(req.body);

        Item.update(req.params.id, new Item(req.body), (err, data) => {
            if (err && err.code == 404) {
                return res.status(404).send({
                    status: false,
                    message: 'ID is not found!',
                    data: null
                });
            }

            if(err){
                return res.status(500).json({
                    status: false,
                    message: err.message,
                    data: null
                });
            }
            res.send(data);
        });
    },

    destroy: async (req, res, next) => {
        try{
            const {channel_id} = req.params;

            const deleted = await Channel.destroy({
                where:{
                    id: channel_id
                }
            });

            if(!deleted){
                return res.status(404).json({
                    status: false,
                    message: `can't find channel with id ${channel_id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: deleted
            })
        } catch(err){
            next(err);
        }
    }
};