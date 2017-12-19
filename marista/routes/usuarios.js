var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		var postBody = req.body;
		var userName = postBody.nome;
		var userPass = postBody.senha;
		connection.query("INSERT INTO usuarios (nome, senha) VALUES	('" + userName + "','" + userPass + "')", function(err, rows){
			if(rows.affectedRows){
				connection.query("SELECT * FROM usuarios WHERE id = '" + rows.insertId + "' LIMIT 1", function(err, rows){
					if(!err && rows.length > 0){
						res.json(rows[0]);
					} else {
						res.json([]);
					}
				});
			}
		});
	});
});

router.get('/', function(req, res, next){
	pool.getConnection(function(err, connection){
		connection.query("SELECT * FROM usuarios", function(err, rows){
			if(!err && rows.length > 0){
				res.json(rows);
			} else {
				res.json([]);
			}
		});
	});
});

router.get('/id', function(req, res, next){
	pool.getConnection(function(err, connection){
		var id = req.params.id;
		connection.query("SELECT * FROM usuarios WHERE id = '" + id + "' LIMIT 1", function(err, rows){
			if(!err && rows.length > 0){
				res.json(rows[0]);
			} else {
				res.json([]);
			}
		});
	});
});

router.put('/id', function(req, res, next){
	pool.getConnection(function(err, connection){
		var putBody = req.body;
		var userId = putBody.id;
		var userName = putBody.nome;
		var userPass = putBody.senha;
		connection.query("UPDATE usuarios SET nome = '" + userName + "', senha = '" + userPass + "' WHERE id = '" + userId + "'", function(err, rows){
			if(rows.affectedRows){
				connection.query("SELECT * FROM usuarios WHERE id = '" + userId + "' LIMIT 1", function(err, rows){
					if(!err && rows.length > 0){
						res.json(rows[0]);
					} else {
						res.json([]);
					}
				})
			}
		})
	});
});

router.delete('/id', function(req, res, next){
	pool.getConnection(function(err, connection){
		var id = req.params.id;
		connection.query("DELETE FROM usuarios WHERE id = '" + id + "'", function(err, rows){
			if(!err){
				res.json({
					"status": true
				});
			}else{
				res.json([]);
			}
		});
	});
});

module.exports = router;