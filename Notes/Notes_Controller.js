const db = require('./Notes_DB');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require('../config.js');

class controller {
    async create (req, res){
        try{
            const {token, message} = req.body;
            const decode = jwt.decode(token);
            if(decode?.secret == secret){
                await db.query('INSERT INTO Notes(person, note, id) VALUES($1, $2, $3) RETURNING *' , [`${decode.email}`,`${message}`,`${Date.now()}`]);
                res.status(200).json({message:""})
            }else{
                res.status(401).json({message:"Unauthorized, token is invalid"});
            }
        }catch(e){
            console.log(e);
            res.status(400).json({message:`${e}`});
        }
    }

    async find (req, res){
        try {
            if(req.params){
                const {token} = req.params;
                const decode = jwt.decode(token);
                if(decode?.secret == secret){
                    const notes = await db.query('SELECT * FROM Notes where person = $1', [decode.email]);
                    console.log(notes.rows)
                    res.status(200).json({message:`${JSON.stringify(notes.rows)}`})
                }else{
                    res.status(401).json({message:"Unauthorized, token is invalid"});
                }
            }else{
                res.status(400).json({message:'token id not defined'});
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({message:`${e}`});
        }
    }

    async update (req, res){
        try {
            const {token, id, message} = req.body;
            const decode = jwt.decode(token);
            if(decode?.secret == secret){
                const note = await db.query('SELECT * FROM Notes where id = $1', [id]);
                if(note.rows.length){
                    await db.query(`UPDATE Notes SET note = '${message}' WHERE id = '${id}'`)
                //     await db.query('DELETE FROM Notes where id = $1', [id]);
                    res.status(200).json({message:`record id:${id} updated successfully`});
                }else{
                    res.status(400).json({message:`there is no record with this id:${id}`});
                }
            }else{
                res.status(401).json({message:"Unauthorized, token is invalid"});
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({message:`${e}`})             
        }
    }
    
    async delete (req, res){
        try {
            const {token, id} = req.body;
            const decode = jwt.decode(token);
            if(decode?.secret == secret){
                const note = await db.query('SELECT * FROM Notes where id = $1', [id]);
                if(note.rows.length){
                    await db.query('DELETE FROM Notes where id = $1', [id]);
                    res.status(200).json({message:`note ${id} deleted`});
                }else{
                    res.status(400).json({message:`there is no record with this id:${id}`});
                }
                
            }else{
                res.status(401).json({message:"Unauthorized, token is invalid"});
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({message:`${e}`});
        }
    }
}
module.exports = new controller 

