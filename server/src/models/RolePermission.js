const mongoose = require('mongoose');

const RolePermissionSchema = new mongoose.Schema({
  roleName: { type: String, required: true },
  moduleName: { type: String, required: true }
});

module.exports = mongoose.model('RolePermission', RolePermissionSchema);
