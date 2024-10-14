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

const router = express.Router();

router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContact));
router.post('/contacts', ctrlWrapper(createContactController));
router.patch('/contacts/:contactId', ctrlWrapper(updateContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
