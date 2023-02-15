class Users {
    constructor() {
        this.users = {};
        this.posts = [];
    }

    add = (user) => {
        if(this.users[user.id])
            throw new Error('This ID not unique!')
        else{
            this.users[user.id] = user;
            return true;
        }
    }

    remove = (id) => {
        if(this.users[id]){
            delete this.users[id];
        }
        else throw new Error('There is not such user')
    }

    removeAll = () => {
        this.users.clear();
    }

    get = (id) => {
        if(this.users[id]) {
            return this.users[id];
        }
        else throw new Error('User not found!');
    }

    getAll = () => {
        return Object.values(this.users);
    }

    set = (user) => {
        if(!this.users[user.id])
            throw new Error ('User not found!');
        else{this.users[user.id] = user;
            return true;
        }

    }

    addPosts = (post) => {
        if(this.posts[post.id])
            throw new Error('This post ID is not unique!');
        else {
            this.posts[post.id] = post;
            return true;
        }
    }

    getAllPosts = () => {
        return Object.values(this.posts);
    }

}