const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Experience extends Model {}

    Experience.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            company: {
                type: DataTypes.STRING
            },
            location: {
                type: DataTypes.STRING
            },
            from: {
                type: DataTypes.DATEONLY
            },
            to: {
                type: DataTypes.DATEONLY
            },
            description: {
                type: DataTypes.STRING(1500)
            },
            current: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            sequelize,
            modelName: "experience"
        }
    );

    Experience.associate = models => {
        // associations can be defined here
        Experience.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "CASCADE"
        });
    };

    return Experience;
};
