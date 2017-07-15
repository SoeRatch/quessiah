'use strict';

 var express = require("express");
 var router = express.Router();
 var Question = require("./models").Question;

 router.param("qID", function(req,res,next,id){
  Question.findById(id, function(err,doc){
    if(err) return next(err);
    if(!doc){
      err = new Error("Not Found");
      err.status = 404;
      return next(err);
    }
    req.question = doc;
 
    return next();
  });
 });

 router.param("aID", function(req,res,next,id){
  req.answer = req.question.answers.id(id);
   if(!req.answer){
      err = new Error("Not Found");
      err.status = 404;
      return next(err);
    }
    next();

 });
 //========================================================
 router.get('/',function(req,res, next){
    res.render('pages/home');
 });
 //========================================================

//GET /questions
//Route for questions collection

 router.get('/questions',function(req,res, next){
  	Question.find({})
                .sort({createdAt: -1}) 
                .exec(function(err, questions){
                    if(err) return next(err);
                    //res.json(questions);
                    res.render('pages/questions', {questions : questions});
                  });
 });

//POST /questions
//Route for creating questions
router.post('/questions',function(req,res, next){

	var question = new Question(req.body);
  question.save(function(err, questions){
    if(err) return next(err);
    res.status(201);
   return res.redirect('/questions');
  });

});

//GET /questions/:id
//Route for specific questions
 router.get('/questions/:qID',function(req,res, next){
    //res.json(req.question);
      res.render('pages/single',{quest : req.question});
 });

//POST /questions/:id/answers
//Route for creating answers
 router.post("/questions/:qID/answers",function(req,res, next){
    req.question.answers.push(req.body);
    req.question.save(function(err,question){
      if(err) return next(err);
      return res.redirect('/questions/'+question._id);
    });
 });


//PUT /questions:id/answers/:aid
//Edit a specific answer
 router.post("/questions/:qID/answers/:aID",function(req,res, next){
 	  req.answer.update(req.body, function(err, question){
        if(err) return next(err);
        return res.redirect('/questions/'+question._id);
    });
  
 });


//Delete a specific question
 //DELETE /questions:qid/del
router.get("/questions/:qID/del",function(req,res){
    req.question.remove(function(err){
      req.question.save(function(err,question){
          res.status(201);
          return res.redirect('/questions');
      });
    });
});


//Delete a specific answers
 //DELETE /questions/:qid/answers/:aid
router.get("/questions/:qID/answers/:aID/del",function(req,res){
    req.answer.remove(function(err){
      req.question.save(function(err,question){
          if(err) return next(err);
          return res.redirect('/questions/'+question._id);
      });
    });
});

//POST /questions:qid/answers/:aid/vote-up
//POST /questions:qid/answers/:aid/vote-down
//vote on a specific answer
router.get("/questions/:qID/answers/:aID/vote-:dir",function(req,res,next){
	if(req.params.dir.search(/^(up|down)$/) === -1){
		var err = new Error("Not FOund");
		err.status = 404;
		next(err);
	} else{
    req.vote = req.params.dir;
		next();
	}
},
function(req,res, next){
    req.answer.vote(req.vote, function(err, question){
      if(err) return next(err);
      return res.redirect('/questions');
    });
    
});


 module.exports = router;












