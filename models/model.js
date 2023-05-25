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
}

module.exports = Item;