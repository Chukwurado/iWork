const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Education extends Model {}

    Education.init(
        {
            school: {
                type: DataTypes.STRING,
                allowNull: false
            },
            degree: {
                type: DataTypes.STRING
            },
            fieldofstudy: {
                type: DataTypes.STRING
            },
            from: {
                type: DataTypes.DATEONLY
            },
            to: {
                type: DataTypes.DATEONLY
            }
        },
        {
            sequelize,
            modelName: "education"
        }
    );

    Education.associate = models => {
        // associations can be defined here
        Education.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "CASCADE"
        });
    };

    return Education;
};
