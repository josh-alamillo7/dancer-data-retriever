const express = require('express')
const app = require('./index.js')
const db = require('../database/index.js')

app.get('/songs/:level', (req, res) => {
  console.log(req.params.level)
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

app.get('/users/:name/:title/:difficulty', (req, res) => {
  const difficultyNames = ['beginnerScores', 'basicScores', 'difficultScores', 'expertScores', 'challengeScores']
  db.getUserInfo(req.params.name, (scores) => {
    let found = false
    scores.forEach((entry) => {
      if (entry.difficulty === req.params.difficulty && entry.songTitle === req.params.title) {
        res.status(200).json(entry.score)
        found = true
      }
    })
    if (!found) {
      res.status(200).json(null)
    }
  })
})

app.put('/users/:name', (req, res) => {
  //see if the user exists. If so, add a new user and initiate them with the song score.

  //otherwise, just add the song to their score.
  db.checkIfUserExists(req.params.name, (userExists) => {
    if (!userExists) {
      db.saveUser(req.params.name, req.body.score, req.body.level, req.body.difficulty, req.body.title)      
    } else {
      console.log('this user already exists so we are going to do something else :)')
      db.updateScoresForUser(req.params.name, req.body.score, req.body.level, req.body.difficulty, req.body.title)
    }
  })
  res.status(201).send('looks like you want to add some score info')
  
})