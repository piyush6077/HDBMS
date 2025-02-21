import express from 'express'
import {verifyJWT} from '../middleware/auth.middleware'
import { createTreatment, deleteTreatment, getAllTreatments, getTreatment, updateTreatment } from '../controllers/treatment.controller'

const router = express.Router()

router.get('/all-treatments', verifyJWT , getAllTreatments)
router.get('/treatment', verifyJWT , getTreatment)
router.post('/create-treatments', verifyJWT , createTreatment)
router.delete('/delete-treatments', verifyJWT ,deleteTreatment )
router.put('/update-treatments', verifyJWT ,updateTreatment )

export default router