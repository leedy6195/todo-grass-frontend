import { createApp } from 'vue'
import App from './App.vue'
import router from "@/scripts/router";
import store from "@/scripts/store"
import 'bootstrap/dist/css/bootstrap.min.css'

//font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas)


createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(store)
    .use(router)
    .mount('#app')
