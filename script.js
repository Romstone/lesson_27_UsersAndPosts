const baseUrl = 'https://jsonplaceholder.typicode.com';
const users = new Users();
const controller = new Controller(users);

const content = document.querySelector('ul');
const formGetPosts = document.querySelector('#form_get_posts');

Toolbox.addNavButtonControl('#btn_form_user',
    ['#form_user', '#form_add_post', '#form_get_posts']);

Toolbox.addNavButtonControl('#btn_form_add_post',
    ['#form_add_post', '#form_user', '#form_get_posts']);

Toolbox.addNavButtonControl('#btn_form_get_posts',
    ['#form_get_posts', '#form_user', '#form_add_post']);


(async () => {
    const response = await fetch(`${baseUrl}/users`);
    console.log(response);
    const json = await response.json();
    //******************************************************************
    await (json.forEach(item => controller.createUser(item)));

    await controller.processUsers(user =>
        Toolbox.addItemToList('ul',
        `User ID: ${user.id} , user Name: ${user.name}, 
        user Nickname: ${user.username}`));

    const responsePost = await fetch(`${baseUrl}/posts`);
    console.log(responsePost);
    const jsonPost = await responsePost.json();

    await (jsonPost.forEach(item => controller.createPosts(item)));
})();



//************************Form User Handler*************************

Toolbox.formHandler('#form_user', user => {
    content.innerHTML = '';
    controller.createUser(user);
    controller.processUsers(user =>
        Toolbox.addItemToList('ul',
            `User ID: ${user.id} , user Name: ${user.name}, 
        user Nickname: ${user.username}`));
});

//************************Form Add Post*************************
Toolbox.formHandler('#form_add_post', item => {
    const posts = users.getAllPosts();
    const id = posts[posts.length - 1].id + 1; //generating unique id to add new post to the array
    let post = {
        title: item.title,
        body: item.body,
        userId: item.userId,
        id: id
    };
    controller.createPosts(post);
    fetch(`${baseUrl}/posts`, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then(response => response.json())
        .then(data => {
            console.log(data);
            alert(`Post by User#${data.userId} successfully added`);
        });

});

//************************Form Get Posts*************************

Toolbox.formHandler('#form_get_posts', () => {
    const id = document.getElementById('id_posts').value;
    content.innerHTML = '';
    controller.processPosts(post => {
        if (+id === +post.userId)
            Toolbox.addItemToList('ul', `User ID: ${post.userId}, 
            Title: ${post.title}, Body: ${post.body}`);
    });
})