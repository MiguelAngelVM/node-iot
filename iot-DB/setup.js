'use strict'

const debug = require('debug')('iot-DB:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()
async function setup () {
  const answer = await prompt([{
      type: 'confirm', 
      name: 'setup',
      message: 'Destruiras la db, estas seguro?'
  }])
  if(!answer.setup){
      return console.log('Continuemos :)')
  }
  const config = {
    database: process.env.DB_NAME || 'iotdb',
    username: process.env.DB_USER || 'miguel',
    password: process.env.DB_PASS || 'delunoalcero',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

setup()