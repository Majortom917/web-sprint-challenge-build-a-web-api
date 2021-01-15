const express = require('express')
const router = express.Router()
const Project = require('./projects-model')


router.get('/', (req, res) => {
    Project.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err.message })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params

    Project.get(id)
        .then(project => {
            if(project){
                res.status(200).json(project)
            }
            else{
                res.status(404).json({ error: err.message })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({ error: err.message })
        })
})


router.post('/', (req, res) => {
    if(!req.body.name || !req.body.description){
        res.status(400).json({ errorMessage: 'requires name AND description'})
    }
    Project.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err.message })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    Project.update(id, changes)
        .then(project => {
            if(req.body.name && req.body.description && req.body.completed){
                res.status(200).json(project)
            }
            else{
                res.status(400).json({ errorMessage: 'requires name, description,AND completed'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ error: err.message })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Project.remove(id)
    .then(project => {
        if(project){
            res.status(200).json({ message: "project lost to the void"})
        }
        else{
            res.status(404).json({ message: 'im gonna need to see some id'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'project resisted delete'})
    })
})

router.get('/:id/actions', (req, res) => {
    const { id } = req.params
    Project.getProjectActions(id)
        .then(projectId => {
            if(projectId){
                res.status(200).json(projectId)
            }
            else{
                res.status(404).json({ errorMessage: 'action AWOL' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: err.message })
        })
})

module.exports = router 