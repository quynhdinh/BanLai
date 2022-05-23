const AdminJS = require('adminjs')
const db = require('../models');
const mongoose = require('mongoose');
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')

AdminJS.registerAdapter(AdminJSMongoose)

const adminJs = new AdminJS({
  databases: [mongoose],
  rootPath: '/admin',
})

const router = AdminJSExpress.buildRouter(adminJs)

module.exports = {adminJs, router};