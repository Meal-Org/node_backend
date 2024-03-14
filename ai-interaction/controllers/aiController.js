const aiService = require('../services/aiService')
const logger = require('../../shared/logger')
const {ValidatioError} = require('../../middleware/errorHandler')

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */