import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';


export const isValidId = (nameId) => {
    return (req, res, next) => {
        const id = req.params[nameId];
        if (!isValidObjectId(id)) {
            return next(createHttpError(400, 'Bad Request'));
        }

        next();
    };
};
