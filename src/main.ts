import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCoffee, faGlobe, faCheck, faX } from '@fortawesome/free-solid-svg-icons';

library.add(faCoffee, faGlobe, faCheck, faX);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon); 
app.mount('#app');

