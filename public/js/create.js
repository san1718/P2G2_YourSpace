const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (!username || !email || !password) {
        alert('Please fill out all fields.');
        return;
    }
    try {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            const errorData = await response.json();
            console.error('Error: ', errorData);
            alert(errorData.message || 'Failed to sign up. Please check your details and try again.');
        }
    } catch (err) {
        console.error('Something went wrong. Error: ', err);
        alert('Unexpected sign up error. Please try again.');
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);



// target to input

/*
const
event listener on submit button


ex mini project 28-Stu - public-js-profile.js
*/