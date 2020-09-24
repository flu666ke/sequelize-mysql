'use strict'

module.exports = (sequelize, Datatypes) => {
  return sequelize.define('course', {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      // fk from the user table
      type: Datatypes.UUID,
      required: true,
      allowNull: false
    },
    title: {
      type: Datatypes.STRING,
      reuqired: true,
      allowNull: false
    },
    description: {
      type: Datatypes.STRING,
      reuqired: false,
      allowNull: true,
    },
    status: {
      type: Datatypes.STRING,
      reuqired: true,
      allowNull: false
    },
    updated_at: { type: Datatypes.DATE },
    deleted_at: { type: Datatypes.DATE }
  },
    {
      underscored: true,
      paranoid: true
    })
}