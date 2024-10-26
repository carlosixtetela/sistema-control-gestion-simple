const Project = require('./project.model');
const Test = require('./test.model');
const Defect = require('./defect.model');

// Asociaciones con alias únicos
Project.hasMany(Test, { foreignKey: 'projectId', as: 'ProjectTests' });
Test.belongsTo(Project, { foreignKey: 'projectId', as: 'Project' });

Test.hasMany(Defect, { foreignKey: 'testId', as: 'TestDefects' });
Defect.belongsTo(Test, { foreignKey: 'testId', as: 'Test' });

module.exports = { Project, Test, Defect };
