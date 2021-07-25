const express = require("express");
const mysql = require("mysql");
const cors = require('cors');
const bodyParser = require("body-parser");
const { ResultWithContext } = require("express-validator/src/chain");
const app = express();
app.use(cors());

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "blog",
    multipleStatements: true,
    port: 3306
});
mysqlConnection.connect((err) => {
    if (err)
        throw err;
    else
        console.log("connected");

});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//**********************************signUp************************/
app.post("/signup", (req, res) => {

    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;



    var sqlQuery = "insert into users (name,email,password) values (?,?,?)";

    /*   mysqlConnection.query(sqlQuery, ["1",name, email, "0", password, "0",getTimeStamp(),getTimeStamp()], (err, result) => {
           if (err)
                throw err;
           res.send("data inserted");
      }); */
    mysqlConnection.query(sqlQuery, [name, email, password], (err, result) => {
        if (err) {
            //  throw err;
          //  res.send("email already exists");
            res.json({
                "status": 404,
                "data": "email already exists"
            });
            res.end();
        } else {
          //  res.send("data inserted");
            res.json({
                "status": 200,
                "data": "login successful"
            });
            res.end();
        }


    });

});
//**********************************signUp************************/



//**********************************Login************************/
app.post("/login", (req, res) => {

    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;



    var sqlQuery = "select * from users where email=?";

    mysqlConnection.query(sqlQuery, [email], (err, result) => {
        if (err) {
            //  throw err;
            res.send("sql error");
        } else {

            console.log(result.email);
            if (result.length !== 0) {
                if (result[0].password === password) {
                    res.json({
                        "status": 200,
                        "data": result[0]
                    });
                    res.end();
                }
                else {
                    res.json({
                        "status": 400,
                        "data": "wrong password"
                    });
                    res.end();
                }

            } else {
                res.json({
                    "status": 404,
                    "data": "user don't exist"
                });
                res.end();
            }

        }
    });

});

//**********************************Login************************/


//**********************************crete post************************/

app.post("/post/create", (req, res) => {

    console.log(req.body);
    var title = req.body.title;
    var content = req.body.content;
    var image = req.body.image;
    var userId = req.body.user_id;



    var sqlQuery = "insert into posts (user_id,title,content,image) values (?,?,?,?)";

    /*   mysqlConnection.query(sqlQuery, ["1",name, email, "0", password, "0",getTimeStamp(),getTimeStamp()], (err, result) => {
           if (err)
                throw err;
           res.send("data inserted");
      }); */
    mysqlConnection.query(sqlQuery, [userId, title, content, image], (err, result) => {
        if (err) {
            // throw err;
            res.send("sql error");
        } else {

            res.json({
                "status": 200,
                "data": "post created"
            });
            res.end();
        }
    });

});

//**********************************crete post************************/



//**********************************get all post************************/

app.get("/post/all", (req, res) => {

    console.log(req.body);

    var sqlQuery = "select * from posts";
    mysqlConnection.query(sqlQuery, (err, result) => {
        if (err) {
            // throw err;
            res.send("sql error");
        } else {

            res.json({
                "status": 200,
                "data": result
            });
            res.end();
        }
    });

});

//**********************************get all post************************/



//**********************************get user post************************/

app.get("/post/user", (req, res) => {

    console.log(req.body);
    var userId = req.body.user_id;

    var sqlQuery = "select * from posts where user_id=?";
    mysqlConnection.query(sqlQuery, [userId], (err, result) => {
        if (err) {
            // throw err;
            res.send("sql error");
        } else {

            res.json({
                "status": 200,
                "data": result
            });
            res.end();
        }
    });

});

//**********************************get user post************************/






//**********************************get post details************************/

app.get("/post/postid", (req, res) => {

    console.log(req.body);
    var postId = req.body.post_id;

    var sqlQuery = "select * from posts where id=?";
    mysqlConnection.query(sqlQuery, [postId], (err, result) => {
        if (err) {
            // throw err;
            res.json({
                "status": 404,
                "data": err
            });
            res.end();
        } else {

            res.json({
                "status": 200,
                "data": result
            });
            res.end();
        }
    });

});

//**********************************get post details************************/






//**********************************edit post************************/

app.put("/post/edit", (req, res) => {

    console.log(req.body);
    var title = req.body.title;
    var content = req.body.content;
    var image = req.body.image;
    var postId = req.body.post_id;

    if (title !== "") {
        var sqlQuery = "update posts set title = ? where id=?";
        mysqlConnection.query(sqlQuery, [title, postId], (err, result) => {
            if (err) {
                // throw err;
                res.send("sql error");
            } else {

                res.json({
                    "status": 200,
                    "data": "title updated"
                });
                res.end();
            }
        });
    }
    if (content !== "") {

        var sqlQuery = "update posts set content = ? where id=?";
        mysqlConnection.query(sqlQuery, [content, postId], (err, result) => {
            if (err) {
                // throw err;
                res.send("sql error");
            } else {

                res.json({
                    "status": 200,
                    "data": "title updated"
                });
                res.end();
            }
        });

    }
    if (image !== "") {

        var sqlQuery = "update posts set image = ? where id=?";
        mysqlConnection.query(sqlQuery, [image, postId], (err, result) => {
            if (err) {
                // throw err;
                res.send("sql error");
            } else {

                res.json({
                    "status": 200,
                    "data": "title updated"
                });
                res.end();
            }
        });

    }





});

//**********************************edit post************************/



//**********************************delete post************************/

app.delete("/post/delete", (req, res) => {

    console.log(req.body);
    var postId = req.body.post_id;

    var sqlQuery = "delete from posts where id=?";
    mysqlConnection.query(sqlQuery, [postId], (err, result) => {
        if (err) {
            // throw err;
            res.send("sql error");
        } else {

            res.json({
                "status": 200,
                "data": "post deleted"
            });
            res.end();
        }
    });

});

//**********************************delete post************************/



//**********************************crete comment************************/

app.post("/comment/create", (req, res) => {

    console.log(req.body);
    var userId = req.body.user_id;
    var postId = req.body.post_id;
    var comment = req.body.comment;
    var name = req.body.name;



    var sqlQuery = "insert into comment (user_id,post_id,comment,name) values (?,?,?,?)";

    mysqlConnection.query(sqlQuery, [userId, postId, comment, name], (err, result) => {
        if (err) {
            // throw err;
            res.json({
                "status": 404,
                "data": err
            });
            res.end();
        } else {

            res.json({
                "status": 200,
                "data": "comment created"
            });
            res.end();
        }
    });

});

//**********************************crete comment************************/




//**********************************get comment of current post************************/

app.get("/comment/all", (req, res) => {

    console.log(req.body);
    var postId = req.body.post_id;

    var sqlQuery = "select * from comment where post_id=?";
    mysqlConnection.query(sqlQuery, [postId], (err, result) => {
        if (err) {
            // throw err;
            res.json({
                "status": 404,
                "data": err
            });
            res.end();
        } else {

            res.json({
                "status": 200,
                "data": result
            });
            res.end();
        }
    });

});

//**********************************get comment of current post************************/


app.listen("8081", () => {
    console.log("server started....");
});