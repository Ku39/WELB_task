const db = require('./Users_db');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require('../config.js');

function GenerateToken(email, password){
    const payload = {
        email,
        password,
        secret
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class controller {
    async registration(req, res){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:errors})
            }
            const {email, password} = req.body
            const hashpass = bcrypt.hashSync(password, 7);
            const token = await GenerateToken(email, hashpass);
            const candidat = await db.query('SELECT * FROM users where email = $1', [email]);
            if(!candidat.rows[0]){
                await db.query('INSERT INTO users(email, password, token) VALUES($1, $2, $3) RETURNING *' , [`${email}`,`${hashpass}`,`${token}`]);
                res.status(200).json({message:`successfully, your token: ${token}`});
            }else{
                res.status(400).json({message:'this email already exists'});
            }
        } catch (e) {
            console.log(e); 
            res.status(400).json({message:'Registration error'});           
        }
    }
    async login(req, res){
        try {
            const {email, password} = req.params
            const user = await db.query('SELECT * FROM users where email = $1', [email]);
            if(!user.rows[0]){
                res.status(400).json({message:'User with this email not found'});
            }else{
                const DeHash = await bcrypt.compareSync(password, user.rows[0].password);
                if(DeHash){
                    res.status(200).json({message:`successfully, your token: ${user.rows[0].token}`});
                }else{
                    res.status(401).json({message:'Unauthorized'});
                }
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({message:'login error'})             
        }
    }
    async delete(req, res){
        try {
            const {token} = req.body;
            const decode = jwt.decode(token);
            console.log(decode)
            const {email} = decode
            const user = await db.query('SELECT * FROM users where email = $1', [email]);
            if(!user.rows[0]){
                res.status(400).json({message:'User with this email not found'});
            }else{
                await db.query('DELETE FROM users where email = $1', [email]);
                res.status(200).json({message:`User:${email} deleted`})
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({message:`${e}`})             
        }
    }
    async update(req, res){
        try {
            const {token, password, new_password} = req.body;
            const decode = jwt.decode(token);
            const {email} = decode
            const user = await db.query('SELECT * FROM users where email = $1', [email]);
            if(!user.rows[0]){
                res.status(400).json({message:'User with this email not found'});
            }else{
                const DeHash = await bcrypt.compareSync(password, user.rows[0].password);
                const hashpass = bcrypt.hashSync(new_password, 7);
                if(DeHash){
                    await db.query(`UPDATE users SET password = '${hashpass}' WHERE email = '${user.rows[0].email}'`)
                    res.status(200).json({message:`User:${email} Password changed successfully`});
                }else{
                    res.status(401).json({message:'Unauthorized'});
                }
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({message:`${e}`})             
        }

    }
}
module.exports = new controller 

