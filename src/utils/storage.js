import Vue from 'vue'

const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
};

const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
};

const removeLocalStorage = (key) => {
  localStorage.removeItem(key)
};

const clearLocalStorage = () => {
  localStorage.clear()
};

const setSessionStorage = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data))
};

const getSessionStorage = (key) => {
  return JSON.parse(sessionStorage.getItem(key))
};

const removeSessionStorage = (key) => {
  sessionStorage.removeItem(key)
};

const clearSessionStorage = () => {
  sessionStorage.clear()
};

Vue.prototype.$setLocalStorage = setLocalStorage;
Vue.prototype.$getLocalStorage = getLocalStorage;
Vue.prototype.$removeLocalStorage = removeLocalStorage;
Vue.prototype.$clearLocalStorage = clearLocalStorage;
Vue.prototype.$setSessionStorage = setSessionStorage;
Vue.prototype.$getSessionStorage = getSessionStorage;
Vue.prototype.$removeSessionStorage = removeSessionStorage;
Vue.prototype.$clearSessionStorage = clearSessionStorage;
