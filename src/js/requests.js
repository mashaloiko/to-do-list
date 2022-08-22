import { userInfo, avatar, name, bio, blog } from './nodes.js';
export function getUser() {


    let job = fetch('https://api.github.com/users/mashaloiko')
    .then(successResponse => {
        if (successResponse.status != 200) {
            return null;
        } else {
            return successResponse.json();
        };
    })
    .then(user => {
        console.log(user);
        userInfo.append(user.login);
        avatar.src = user.avatar_url;
        
        if (user.name == '') {
            name.append('Anonymous'); 
        } else {
            name.append(user.name);
        };

        if (user.bio == '') {
            bio.append('Front-End Developer');
        } else {
            bio.append(user.bio);
        };
        
        if (user.blog == '') {
            blog.remove();
        } else {
            blog.append(user.blog);
        };
    });

    console.log(job);
};