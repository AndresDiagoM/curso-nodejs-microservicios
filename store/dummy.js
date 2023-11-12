const db = {
    'user': [
        { id: '1', name: 'Carlos' },
    ],
};

async function list (table) {
    return db[table] || [];
}

async function get (table, id) {
    let col = await list(table);
    return col.filter(item => item.id === id)[0] || null;
}

async function upsert (table, data) {
    if (!db[table]) {
        db[table] = [];
    }
    db[table].push(data);
    console.table(db[table]);
    return db[table];
}

async function update (table, data) {
    let col = await list(table);
    let index = col.findIndex(item => item.id === data.id);
    col[index].name = data.name;
    return col;
}

async function remove (table, id) {
    let col = await list(table);
    let index = col.findIndex(item => item.id === id);
    col.splice(index, 1);
    return col;
}

async function query (table, q) { // q : { username: '', password: ''}
    let col = await list(table);
    let keys = Object.keys(q); // ['username', 'password']
    let key = keys[0]; // 'username'
    return col.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
    list,
    get,
    upsert,
    update,
    remove,
    query,
};
