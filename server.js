var express = 	require('express');
var app		=	express();

var mongojs	=	require('mongojs');
var db		=	mongojs('ecommerce', ['users']);

var bodyParser	=	require('body-parser');


app.use(express.static(__dirname+"/public"));

app.use(bodyParser.json());

app.get('/userslist', function(req, res){

	//console.log('I received a GET request');
	
	db.users.find(function(err, docs){
		//console.log(docs);
		res.json(docs);
	});

});


app.post('/userslist', function(req, res){
	//console.log(req.body);
	db.users.insert(req.body, function(err, doc){
		res.json(doc);
	});
});


//delete-employee-code

app.delete('/userslist/:id', function(req, res){
	var id =	req.params.id;
	//console.log('SERVER: '+id);
	db.users.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});


// edit-employee

app.get('/userslist/:id', function(req, res){
	var id = req.params.id;
	//console.log('SERVER : '+id);
	db.users.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		//console.log(doc);
		res.json(doc);
	});
});

// Update-emp

app.put('/userslist/:id', function(req, res){
	var id = req.params.id;	
	//console.log(req.body.name);
	db.users.findAndModify({query: {_id: mongojs.ObjectId(id)},		
		update: {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone}},		
		new: true}, function(err, doc){
			res.json(doc);
		}
	);
});

app.listen(8081);

console.log('server started on port no 8081');

