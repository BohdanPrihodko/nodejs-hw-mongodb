import createError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';

// Контролер для отримання всіх контактів
export const getContacts = async (req, res, next) => {
  const contacts = await getAllContacts();
  res.json({ message: 'Contacts list', data: contacts });
};

// Контролер для отримання контакту за ID
export const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  res.json({ message: `Contact with ID ${contactId}`, data: contact });
};

// Контролер для створення нового контакту
export const createContactController = async (req, res, next) => {
  const newContact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

// Контролер для оновлення контакту
export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await updateContactById(contactId, req.body);
  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

// Контролер для видалення контакту
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await deleteContactById(contactId);
  if (!deletedContact) {
    throw createError(404, 'Contact not found');
  }
  res.status(204).send();
};
