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
                res.status(500).json({
                    status: false,
                    message: err.message,
                    data: null
                });
            }
            res.send(data);
        });

        // const items = await con.query(`select * from item where name = '${name}'`);
        // if(items){
        //     return res.status(400).json({
        //         status: false,
        //         message: `item ${name} is already exist!`,
        //         data: items
        //     });
        // }

        // const newItem = await con.query(`insert into item set name = '${name}', description = '${description}', quantity = '${quantity}', price = '${price}'`);

        // return res.status(201).json({
        //     status: true,
        //     message: 'success',
        //     data: newItems
        // });
    },

    index: async (req, res, next) => {
        try{
            const {channel_id} = req.params;

            const channel = await Channel.findOne({
                where:{
                    id: channel_id
                }
            });

            if(!channel){
                return res.status(404).json({
                    status: false,
                    message: `can't find channel with id ${channel_id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: channel
            })
        } catch(err){
            next(err);
        }
    },

    store: async (req, res, next) => {
        try{
            const {name, description} = req.body;

            const channel = await Channel.create({
                name: name,
                description: description
            })

            return res.status(201).json({
                status: true,
                message: 'success',
                data: channel
            })
        } catch(err){
            next(err);
        }
    },

    update: async (req, res, next) => {
        try{
            // get id from params
            const {channel_id} = req.params;

            // update data channel
            const updated = await Channel.update(req.body, {
                where: {
                    id: channel_id
                }
            });
            
            // check if data exist or not
            if(updated[0] == 0){
                return res.status(404).json({
                    status: false,
                    message: `can't find channel with id ${channel_id}!`,
                    data: null
                });
            }

            // return response
            return res.status(201).json({
                status: true,
                message: 'success',
                data: null
            })
        } catch(err){
            next(err);
        }
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