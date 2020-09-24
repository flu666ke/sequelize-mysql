'use strict'

module.exports = (sequelize, Datatypes) => {
  return sequelize.define('course_history', {
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
    version: {
      type: Datatypes.INTEGER,
      required: true,
      allowNull: false,
      dafaultValue: 0
    },
    course_id: {
      //fk from course table
      type: Datatypes.INTEGER,
      required: true,
      allowNull: false,
    },
    updated_at: { type: Datatypes.DATE },
    deleted_at: { type: Datatypes.DATE }
  },
    {
      underscored: true,
      paranoid: true
    })
}