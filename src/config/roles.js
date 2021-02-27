const roles = ['admin', 'cook', 'participant'];

const roleRights = new Map();
roleRights.set(roles[0], ['getUsers', 'manageUsers']);
roleRights.set(roles[1], ['manageDishes']);

module.exports = {
  roles,
  roleRights,
};
