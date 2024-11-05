// src/routers/contacts.js
import express from 'express';
import {
  getContacts,
  getContact,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContacts));

router.get('/:contactId', isValidId('contactId'), ctrlWrapper(getContact));

router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  upload.single('photo'),
  isValidId('contactId'),
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

router.delete(
  '/:contactId',
  isValidId('contactId'),
  ctrlWrapper(deleteContactController),
);

export default router;
