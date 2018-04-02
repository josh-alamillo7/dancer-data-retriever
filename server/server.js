const express = require('express')
const app = require('./index.js')
const db = require('../database/index.js')

app.get('/songs/:level', (req, res) => {
  db.findAllByLevel(Number(req.params.level), (data) => {  
    const output = []
    data.forEach(song => {
      song.levels.forEach((level, index) => {
        if (level === Number(req.params.level)) {
          output.push([song.title, index])
        }
      })
    })
    res.status(200).json(output)
  })      
  }
)

app.get('/songs/info/:title/:difficulty', (req, res) => {
  const difficultyNames = ['beginnerScores', 'basicScores', 'difficultScores', 'expertScores', 'challengeScores']
  db.findByTitle(req.params.title, (data) => {
    res.json(data[0].scores[difficultyNames[req.params.difficulty]])
  })
})

app.put('/users/:name', (req, res) => {
  //see if the user exists. If so, add a new user and initiate them with the song score.

  //otherwise, just add the song to their score.
  db.checkIfUserExists(req.params.name, (userExists) => {
    if (!userExists) {
      
    }
  })
  res.status(501).send('looks like you want to add some score info')
})