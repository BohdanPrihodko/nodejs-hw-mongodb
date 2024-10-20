import createError from 'http-errors';
import { isValidObjectId } from 'mongoose';


export function isValidId(req, res, next) {
  const { id } = req.params;

  if (isValidObjectId(id) !== true) {
    return next(createError(400, 'ID is not valid'));
  }

  next();
}
