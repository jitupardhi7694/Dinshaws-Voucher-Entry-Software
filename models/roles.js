const { DataTypes } = require('sequelize');
const db = require('../helpers/init-mysql');

const UserRoles = db.define(
    'user_roles',
    {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        role_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        ip_addr: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
    },

    {
        timestamps: true,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'id' }],
            },
        ],
    }
);

module.exports = UserRoles;
