'use strict';
module.exports = (sequelize, DataTypes) => {
  var ListContent = sequelize.define('ListContent', {
    title: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ListContent;
};