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
}

Item.update = (id, item, result) => {
    con.query(
        'update item set description = ?, quantity = ?, price = ? where id = ?',
        [item.description, item.quantity, item.price, id],
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
}

module.exports = Item;