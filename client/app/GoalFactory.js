(function() {
  'use strict';

  angular
    .module('app')
    .factory('GoalFactory', GoalFactory);

  function GoalFactory($http) {
    const findOrCreateUser = (name, email) =>
      $http({
        method: 'POST',
        url: 'api/auth',
        data: {
          name: name,
          email: email
        }
      });

    const findUser = (id) =>
      $http({
        method: 'GET',
        url: 'api/users',
        data: {
          id: id
        }
      });

    const updateUser = (email, data) =>
      $http({
        method: 'PUT',
        url: `api/users/${email}`,
        data: data
      });

    const createGoal = (text, email) =>
      $http({
        method: 'POST',
        url: `api/goals/${email}`,
        data: {
          goalName: text
        }
      });

    const getUserGoals = (userid) =>
      $http({
        method: 'GET',
        url: `api/goals/${userid}`
      });

    const deleteGoal = (id) =>
      $http({
        method: 'DELETE',
        url: `api/goal/${id}`
      });

    const getOneGoal = (id) =>
      $http({
        method: 'GET',
        url: `api/goal/${id}`
      });

    const updateGoal = (id, data) =>
      $http({
        method: 'PUT',
        url: `api/goals/${id}`,
        data: data
      });

    return {
      findOrCreateUser: findOrCreateUser,
      findUser: findUser,
      getUserGoals: getUserGoals,
      createGoal: createGoal,
      updateGoal: updateGoal,
      deleteGoal: deleteGoal,
      updateUser: updateUser
    }
  };
}());