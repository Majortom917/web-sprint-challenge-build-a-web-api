const Projects = require('../projects/projects-model')

async function projectId(req, res,next){
    try{const project = await Projects.get(req.params.id)
    if(project){
        req.project=project
        next()
    }else{
        res.status(404).json(`Project with id ${req.params.id} not found`)
    }
    }catch(error){
        console.log(error)
        res.status(500).json({Message:'There was an error validating your request'})
    }
}

function validateProjectBody(req,res,next){
    if(Object.keys(req.body).length ===0){
        res.status(400).json({message: 'No Data'})
    }
    else if(!req.body.name){
        res.status(400).json({message: 'Missing name'})
    }
    else if(!req.body.description){
        res.status(400).json({message: 'Missing description'})
    }
    else{next()}
}

async function validateActionId(req,res,next){
    try{
        const action = await action.get(req.params.id)
        if(action){
            req.action=action
            next()
        }else{
            res.status(404).json(`Action ${req.params.id} not found`)
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'error validating request'})
    }
}

async function validateActionBody(req,res,next){
    if(Object.keys(req.body).length===0){
        res.status(400).json({message:'Missing action data'})
    }
    else if(!req.body.project_id){
         res.status(400).json({message:'Missing project ID'})
    }
    else if (!req.body.description){
        res.status(400).json({message: 'Missing description'})
    }
    else if(!req.body.notes){
        res.status(400).json({message: 'Missing action notes'})
    }
    else{
        try{ const project = await Project.get(req.body.project_id)
        if (project){
            next()
        }
    else{res.status(400).json({message:'the project_id does not match any existing projects'})
   }
}
catch(err){
    console.log(err)
    res.status(500).json({message: 'there was an error validating your request'})
    }
    }
}

module.exports = {projectId, validateProjectBody, validateActionBody, validateActionId}