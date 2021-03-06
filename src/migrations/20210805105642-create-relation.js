'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Relations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',//Para borrar en todas las tablas o sumar y asi mantener nuestra integridad
        onUpdate: 'CASCADE'
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts',
          key: 'id'
        },
        onUpdate: 'CASCADE',//Para borrar en todas las tablas o sumar y asi mantener nuestra integridad
        onUpdate: 'CASCADE'
      },
      commentsId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Comments',
          key: 'id'
        },
        onUpdate: 'CASCADE',//Para borrar en todas las tablas o sumar y asi mantener nuestra integridad
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Relations');
  }
};