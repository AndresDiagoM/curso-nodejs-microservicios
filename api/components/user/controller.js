const nanoid = require('nanoid');
const auth = require('../auth');

const TABLA = 'users';


module.exports = function(injectedStore, injectedCache) {
    let store = injectedStore;
    let cache = injectedCache;
    if (!store) {
        store = require('../../../store/dummy');
    }
    if (!cache) {
        cache = require('../../../store/dummy');
    }

    async function list () {
        let users = await cache.list(TABLA);

        if (!users) {
            console.log('There is no data in cache');
            users = await store.list(TABLA);
            cache.upsert(TABLA, users);
        } else {
            console.log('There is data in cache');
        }
        return users;
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            lastname: body.lastname,
            username: body.username,
            email: body.email,
        }

        if (body.id) {
            user.id = body.id;
        } else {
            user.id = nanoid();
        }

        if(body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            });
        }

        return store.upsert(TABLA, user);
    }

    function remove(id) {
        return store.remove(TABLA, id);
    }

    function follow(from, to) {
        return store.upsert(TABLA + '_follows', {
            user_from: from,
            user_to: to,
        });
    }

    async function following(user) {
        const join = {};
        join[TABLA] = 'user_to'; // { users: 'user_to' }
        const query = { user_from: user };
        return await store.query(TABLA + '_follows', query, join);
    }

    return {
        list,
        get,
        upsert,
        remove,
        follow,
        following,
    };
}