// src/controllers/contacts.js
import createError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';
import Contact from '../db/models/contacts.js';

// Контролер для отримання всіх контактів
export const getContacts = async (req, res, next) => {
  try {
    const {
      page = 1,
      perPage = 10,
      sortBy = 'name',
      sortOrder = 'asc',
      type,
      isFavourite,
    } = req.query;

    const skip = (page - 1) * perPage;
    const filter = {};

    if (type) filter.contactType = type;
    if (isFavourite) filter.isFavourite = isFavourite === 'true';

    const totalItems = await getAllContacts();
    const contacts = await Contact.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(Number(perPage));

    const totalPages = Math.ceil(totalItems.length / perPage);

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        data: contacts,
        page: Number(page),
        perPage: Number(perPage),
        totalItems: totalItems.length,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    });
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
      throw createError(404, 'Contact not found');
    }
    res.json({
      status: 200,
      message: `Contact with ID ${contactId}`,
      data: contact,
    });
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
  const { contactId } = req.params;
  try {
    const updatedContact = await updateContactById(contactId, req.body);
    if (!updatedContact) {
      throw createError(404, 'Contact not found');
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
  const { contactId } = req.params;
  try {
    const deletedContact = await deleteContactById(contactId);
    if (!deletedContact) {
      throw createError(404, 'Contact not found');
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
