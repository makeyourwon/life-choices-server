//import modules
import express from 'express'

// import controllers
import { getUser, updateUser, deleteUser } from '../controllers/user.js'
import isLoggedIn from '../middleware/isLoggedIn.js'

const router = express.Router()

// test route
router.get('/', function(req, res){
    res.send({
        message: 'home page'
    })
})

// Get all users
router.get('/users', async (req, res) => {
    try{
        const users = await getUser()
        res.status(200).send({users:users})

    }
    catch(error){
        res.status(500).send({
            getuser:`${error}`
        })
    }
    

})

//Remove this when auth router are done.
// router.post('/users', async (req, res) => {
//     try{
//         // console.log(req)
//         const newUser = await createUser(req.body)
//         res.status(200).json({
//             newUser: `${newUser}`})
//     }
//     catch(error){
//         res.status(500).send({
//             createUser: `${error}`
//         })
//     }
// })

router.put('/users/:id', isLoggedIn, async(req, res) =>{
    try{
        const id = req.params.id
        const loggedInUser = req.user.user
        if ( id === loggedInUser._id){
            const updateUserInfo = await updateUser(id, req.body)
            res.status(200).send({
                updateUserInfo:`${updateUserInfo}`
            })
        }else{
            res.status(500).send({
                UpdateUserError:`You have no permit to delete this user`
            })
        }

    }
    catch(error){
        res.status(500).send({
            updateUserInfo: `${error}`
        })
    }

})

router.delete('/users/:id', isLoggedIn, async (req, res) => {
    try{
        const id = req.params.id
        const loggedInUser = req.user.user
        // console.log('delete req.user',loggedInUser)
        // console.log('req.body._id',loggedInUser._id)
        //check if loggedIn user is permitted to delete this user under :id.
        if (id === loggedInUser._id){
            const deletedUser = await deleteUser(id)
            res.status(200).send({
            deleteduser:`${deletedUser}`
        })
        }else{
            res.status(500).send({
                deleteUserError:`You have no permit to delete this user`
            })
        }
    }
    catch(error){
        res.status(500).send({
            deleteUserError: `${error}`
        })
    }
})


export default router
