module.exports = function(app, express, db) {
  //add routes and controller based on database endpoints

  app.post('/api/auth', function(req, res) {
    //console.log('Attempting to create new user');
    //console.log('Reqest body: ', req.body);
    db.User.findOrCreate({where: {
      email: req.body.email,
    }})
      .then(function(user) {
        res.send(user);
      });
  });

  app.put('/api/users/:email', function(req, res) {
    db.User.findOne({
      where: {
        email: req.params.email
      }
    })
      .then(function(user) {
        user.update(req.body);
        res.send(user);
      });
  });

  // this is a change

  app.get('/api/users/:email', function(req, res) {
    db.User.findOne({
      where: {
        email: req.params.email
      }
    })
      .then(function(user) {
        res.send(user);
      });
  });

  app.get('/api/goals/:email', function(req, res) {
    db.User.findOne({
      where: {
        email: req.params.email
      }
    })
    .then(function (user) {
      //console.log(user.dataValues.id);
      db.Goal.findAll({
        where: {
          UserId: user.dataValues.id
        },
        include: [db.Progress]
      })
      .then(function(results) {
        //console.log('Results ******************************** ' + results);
        res.send(results);
      });
    });
  });

  app.post('/api/goals/:email', function(req, res) {
    db.User.findOne({
      where: {
        email: req.params.email
      }
    })
      .then(function(user) {
        // console.log('*******USER: ', user);
        db.Goal.create({
          UserId: user.id,
          goalName: req.body.goalName,
          public: req.body.public,
          GoalId: req.body.GoalId,
          number: req.body.number,
          units: req.body.units,
          due: req.body.due
        })
          .then(function(goal) {
            res.send(goal);
          });
      })
      .catch(function (error) {
        res.send(`Error: ${e}`);
      });
  });

  app.delete('/api/goal/:id', function(req, res) {
    db.Goal.destroy({
      where: { GoalId: req.params.id }
    })
      .then(function() {
        db.Goal.destroy({
          where: { id: req.params.id }
        });
      })
      .then(function() {
        res.send('Task deleted');
      });
  });

  app.get('/api/goal/:id', function(req, res) {
    db.Goal.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(goal) {
        res.send(goal);
      });
  });

  app.post('/api/progress/:goal', function(req, res) {
    db.Progress.create({
      GoalId: req.params.goal,
      number: req.body.number
    })
    .then(function(progress) {
      res.send(progress);
    });
  });

  app.get('/api/progress/:goal', function(req, res) {
    db.Progress.findAll({
      where: {
        GoalId: req.params.goal
      }
    })
    .then(function(progress) {
      res.send(progress);
    });
  });

  app.put('/api/goal/:id', function(req, res) {
    db.Goal.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(goal) {
        goal.update(req.body);
        res.send(goal);
      });
  });
};