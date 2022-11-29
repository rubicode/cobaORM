var express = require('express');
var router = express.Router();
var models = require('../models');
var { Response } = require('../helpers/util')

router.get('/', async function (req, res, next) {
    try {
        const todos = await models.Todo.findAll({
            include: models.User
        })
        res.json(new Response(todos))
    } catch (err) {
        res.status(500).json(new Response(err, false))
    }
});

router.post('/', async function (req, res, next) {
    try {
        const todo = await models.Todo.create(req.body)
        res.json(new Response(todo))
    } catch (err) {
        res.status(500).json(new Response(err, false))
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        const todo = await models.Todo.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        })
        res.json(new Response(todo[1]))
    } catch (err) {
        res.status(500).json(new Response(err, false))
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        const todo = await models.Todo.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json(new Response(todo))
    } catch (err) {
        res.status(500).json(new Response(err, false))
    }
});

module.exports = router;
