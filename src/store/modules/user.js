const type = {
  SET_USER: 'SET_USER',
  SET_SCHOOL_ID: 'SET_SCHOOL_ID'
};

const state = {
  user: {},
  schoolId: 0
};

const getters = {
  user: state => state.user,
  schoolId: state => state.schoolId
};

const mutations = {
  [type.SET_USER](state, user) {
    if (user) state.user = user;
    else state.user = {}
  },
  [type.SET_SCHOOL_ID](state, schoolId) {
    if (schoolId) state.schoolId = schoolId;
    else state.schoolId = 0
  }
};

const actions = {
  setUser: ({commit}, user) => {
    commit(type.SET_USER, user)
  },
  setSchoolId: ({commit}, schoolId) => {
    commit(type.SET_SCHOOL_ID, schoolId)
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
