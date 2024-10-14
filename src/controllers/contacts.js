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
  try {
    const contacts = await getAllContacts();
    res.json({ message: 'Contacts list', data: contacts });
  } catch (err) {
    next(err);
  }
};

// Контролер для отримання контакту за ID
export const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      return next(createError(404, 'Contact not found'));
    }

    res.json({ message: `Contact with ID ${contactId}`, data: contact });
  } catch (err) {
    next(err);
  }
};

// Контролер для створення нового контакту
export const createContactController = async (req, res, next) => {
  try {
    const newContact = await createContact(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
};

// Контролер для оновлення контакту
export const updateContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await updateContactById(contactId, req.body);

    if (!updatedContact) {
      return next(createError(404, 'Contact not found'));
    }

    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (err) {
    next(err);
  }
};

// Контролер для видалення контакту
export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await deleteContactById(contactId);

    if (!deletedContact) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
