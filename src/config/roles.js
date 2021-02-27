const roles = ['admin', 'cook', 'participant'];

const roleRights = new Map();
roleRights.set(roles[0], ['getUsers', 'manageUsers', 'manageIngredients']);
roleRights.set(roles[1], ['manageDishes', 'manageIngredients']);

module.exports = {
  roles,
  roleRights,
};
