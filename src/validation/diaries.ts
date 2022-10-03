import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { Visibility, Weather } from '../types'

const validate: any[] = [
  body('comment')
    .exists()
    .isString(),
  body('date')
    .exists()
    .isString()
    .isDate({ format: 'DD/MM/YYYY' }),
  body('weather')
    .exists()
    .isIn([...Object.values(Weather)]),
  body('visibility')
    .exists()
    .isIn([...Object.values(Visibility)]),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

export default validate
