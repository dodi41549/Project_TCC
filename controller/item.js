const Item = require('../models/item');

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
            return data;
        });
        res.redirect('/show');
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
            console.log(data);
            return res.render('show', {items: data});
        });
    },

    showId: (req, res) => {
        Item.getId(req.params.id, (err, data) => {
            console.log(req.params.id);
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
            console.log(data);
            res.render('edititem', {items: data});
        });
    },

    showEdit: (req, res) => {
        Item.getAll((err, data) => {
            if(err){
                return res.status(500).json({
                    status: false,
                    message: err.message,
                    data: null
                });
            }
            console.log(data);
            return res.render('edit', {items: data});
        });
    },

    showDelete: (req, res) => {
        Item.getAll((err, data) => {
            if(err){
                return res.status(500).json({
                    status: false,
                    message: err.message,
                    data: null
                });
            }
            console.log(data);
            res.render('delete', {items: data});
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
            return data;
        });
        res.redirect('/show');
    },

    destroy: (req, res) => {
        Item.destroy(req.params.id, (err, data) => {
            if(err && err.code == 404) {
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
            console.log('deleted successfully!');
        });
        res.redirect('/show');
    }
};