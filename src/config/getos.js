'use strict'

const getos = require('getos')

exports.getos = (callback) => {
    getos(function(e,os) {
        callback(e, os)
    })
}