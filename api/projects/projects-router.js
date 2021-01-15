// Write your "projects" router here!
const express = require('express')
const router = express.Router()
const Project = require('./projects-model')
const {projectId, validateProjectBody} = require('../middleware/index')

router.get('/', ((req, res, next)=>{
    Project.get()
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(next)
}))

router.get('/:id', projectId, (req, res, next) =>{
    res.status(200).json(req.project)
})   

router.post('/', validateProjectBody, (req,res,next)=>{
    Project.insert(req.body)
    .then(project =>{
        res.status(200).json(project)
    })
    .catch(next)
})
router.put('/:id',projectId, validateProjectBody, (req,res,next)=>{
    Project.update(req.params.id,req.body)
        .then(project=>{
            res.status(200).json(project)
        })
        .catch(next)
})
router.delete('/:id',projectId, (req,res,next)=>{
    Project.remove(req.params.id)
        .then(deleted=>{
            if (deleted===1){
                res.status(200).json({message:`The project ${req.params.id} was deleted`})
            }
            else{res.status(500).json({message:'error deleting the project'})}
        })
        .catch(next)
})

router.get('/:id/actions',projectId,(req,res,next)=>{
    Project.getProjectActions(req.params.id)
        .then(actionsArray=>{
            res.status(200).json(actionsArray)
        })
        .catch(next)
})
router.use((error, req, res, next)=>{
    res.status(500).json({ info: 'There was an error in the router',
  message: error.message,
  stack: error.stack})
  })

module.exports=router