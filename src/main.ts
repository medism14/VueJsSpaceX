import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCoffee, faGlobe, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faCoffee, faGlobe, faCheck, faTimes);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon); 
app.mount('#app');

