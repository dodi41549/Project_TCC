const con = require('../external/database');

const Item = function(item){
    this.name = item.name;
    this.description = item.description;
    this.quantity = item.quantity;
    this.price = item.price;
};

Item.create = (newItem, result) => {
    con.query('insert into item set ?', newItem, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return result(err, null);
        }

        console.log('item created: ', {
            id: res.insertId,
            ...newItem
        });
        
        result(null, {id: res.insertId, ...newItem});
    });
};

Item.getId = (id, result) => {
    con.query(`select * from item where id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return result(err, null);
        }

        if (res.affectedRows == 0) {
            return result({ code: 404 }, null);
        }

        console.log('found item: ', res[0]);
        result(null, res[0]);
    });
};

Item.getAll = (result) => {
    const query = 'select * from item';

    con.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return result(err, null);
        }

        console.log('item:', res);
        result(null, res);
    });
};

Item.update = (id, item, result) => {
    con.query(
        'update item set name = ?, description = ?, quantity = ?, price = ? where id = ?',
        [item.name, item.description, item.quantity, item.price, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                return result(null, err);
            }

            if (res.affectedRows == 0) {
                return result({ code: 404 }, null);
            }

            console.log('updated item:', {id: id, ...item});
            result(null, {id: id, ...item});
        }
    );
};

Item.destroy = (id, result) => {
    con.query('delete from item where id = ?', id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return result(null, err);
        }

        if (res.affectedRows == 0) {
            return result({ code: 404 }, null);
        }

        console.log("deleted item with id: ", id);
        result(null, res);
    });
};

module.exports = Item;