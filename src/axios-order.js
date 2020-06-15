import axios from 'axios';

const instance= axios.create({
    baseURL: 'https://mysandwichapp-fccc3.firebaseio.com/'
});

export default instance;