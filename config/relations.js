const defineRelationships = (models) => {
  
  // Relación User -> Task (uno a muchos)
  models.User.hasMany(models.Task, {
    foreignKey: 'userId',
    as: 'tasks',
    onDelete: 'CASCADE',
  });

  models.Task.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
  });
};

module.exports = defineRelationships;
