import express, { Request, Response } from 'express'
import * as diaryServices from '../services/diaryServices'
// import toNewDiaryEntry from '../validation/custom'
import validate from '../validation/diaries'
const router = express.Router()

router.get('/', (req, res) => {
  res.send(diaryServices.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  const diary = diaryServices.findById(+req.params.id)
  return (diary != null)
    ? res.send(diary)
    : res.sendStatus(404)
})

router.post('/', validate, (req: Request, res: Response) => {
  try {
    const newDiaryEntry = req.body
    // const newDiaryEntry = toNewDiaryEntry(req.body)

    const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry)

    res.json(addedDiaryEntry)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

export default router
