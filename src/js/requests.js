export function getUser() {

    let job = fetch('https://api.github.com/users/mashaloiko')
    .then(successResponse => {
        if (successResponse.status != 200) {
            return null;
        } else {
            return successResponse.json();
        };
    }
    )
    .then(user => console.log(user.bio));

    console.log(job);
};