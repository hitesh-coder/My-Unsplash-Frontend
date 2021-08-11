import { createStore } from "vuex";
import postService from "../postService";

export default createStore({
  state: {
    photoCredentials: {
      label: '',
      imageURL: '',
      userPassword: ''
    },
    files: [],
    error: null,
    passwordForConfirmation: '',
    searchByName: '',
    errorPresent: false
  },
  mutations: {
    updateLabel(state, label) {
      state.photoCredentials.label = label.toUpperCase()
    },
    updateUserPassword(state, userPassword) {
      state.photoCredentials.userPassword = userPassword
    },
    updateImageURL(state, imageURL) {
      state.photoCredentials.imageURL = imageURL
    },
    updatePasswordForConfirmation(state, passwordForConfirmation) {
      state.passwordForConfirmation = passwordForConfirmation
    },
    searchByName(state, searchByName) {
      state.searchByName = searchByName.toUpperCase()
    },
    async getImages(state) {
      try {
        state.files = await postService.getPosts();
      } catch (err) {
        state.error = err.message;
        state.errorPresent = true
        setTimeout(() => {
          state.errorPresent = false
        }, 3000)
      }
    },
    addPhoto(state) {
      try {
        postService.insertPost(state.photoCredentials)
        // console.log(JSON.stringify( state.photoCredentials))
      } catch (err) {
        state.error = err.message
        state.errorPresent = true
        setTimeout(() => {
          state.errorPresent = false
        }, 3000)
      }
    },
    setError(state, payload) {
      state.error = payload
      state.errorPresent = true
      setTimeout(() => {
        state.errorPresent = false
      }, 3000)
    },
    resetCredentials(state){
      state.photoCredentials.label = ''
      state.photoCredentials.imageURL = ''
      state.photoCredentials.userPassword = ''
    },
    deleteImage(state, id) {
      try {
        postService.deletePost(id)
      } catch (err) {
        state.error = err
        state.errorPresent = true
        setTimeout( () => {
          state.errorPresent = false
        },3000)
      }
    }
  },
  actions: {
    getImages(state) {
      state.commit('getImages')
    },
    addPhoto(state) {
      state.commit('addPhoto')
    },
    deleteImage(state, id) {
      state.commit('deleteImage',id)
    }
  },
  modules: {},
  getters: {
    files: (state) => state.files,
    searchByName: (state) => state.searchByName,
    error: (state) => state.error,
    errorPresent: (state) => state.errorPresent,
  }
});
