import throttle from 'lodash.throttle';


const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form [name=email]'),
    textarea: document.querySelector('.feedback-form [name=message]'),
};

// const feedbackFormState = {

//};

const getFeedbackFormState = (e) => {    
    const savedFeedback = localStorage.getItem('feedback-form-state');
    if (savedFeedback) {
        refs.email.value = (JSON.parse(savedFeedback).email || null);
        refs.textarea.value = (JSON.parse(savedFeedback).message || null);
    };     
};

getFeedbackFormState();
const feedbackFormState = (JSON.parse(localStorage.getItem('feedback-form-state')) || {});


const onFormSubmit = (e) => {
    e.preventDefault();

    if (e.currentTarget.elements.email.value == '' || e.currentTarget.elements.message.value == '') {
        return alert('все поля должны быть заполнены');
    };

    // console.log(e.target.elements.email.name, '....', e.target.elements.email.value)
    // console.log(e.target.elements.message.name, '....', e.target.elements.message.value)
    const sendedFeedback = {
        [e.target.elements.email.name]: e.target.elements.email.value,
        [e.target.elements.message.name] : e.target.elements.message.value,
    };
    console.log(sendedFeedback);
    e.currentTarget.reset();
    localStorage.removeItem('feedback-form-state');
    clearObj(feedbackFormState);
    // console.log(sendedFeedback);
};

const onFeedbackFormInput = (e) => {
    try {
        feedbackFormState[e.target.name]=e.target.value;
        // console.log(feedbackFormState)
        localStorage.setItem('feedback-form-state',JSON.stringify(feedbackFormState));
    } catch(error) {
        console.log(error.message);
    }
    
};

const clearObj=(obj) => {
    for (const key in obj) {
        delete obj[key];
    };
}

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFeedbackFormInput,500));
