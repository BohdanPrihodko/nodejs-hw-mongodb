// src/controllers/contacts.js
import createHttpError from 'http-errors';
import {
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';
import Contact from '../db/models/contacts.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';


// Контролер для отримання всіх контактів користувача
export const getContacts = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = req.query;
    const skip = (page - 1) * perPage;
    const filter = { userId: req.user._id };

    if (type) filter.contactType = type;
    if (isFavourite) filter.isFavourite = isFavourite === 'true';

    const totalItems = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(Number(perPage));

    const totalPages = Math.ceil(totalItems / perPage);

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        data: contacts,
        page: Number(page),
        perPage: Number(perPage),
        totalItems,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Контролери для роботи з конкретним контактом
export const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId, req.user._id);
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
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
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
 try {
    const newContact = await createContact(
      { ...req.body, photo: photoUrl },
      req.user._id
    );
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
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  try {
    const updatedContact = await updateContactById(contactId, {
      ...req.body,
      photo: photoUrl,
    }, req.user._id);

    if (!updatedContact) {
      throw createHttpError(404, 'Contact not found');
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
    const deletedContact = await deleteContactById(contactId, req.user._id);
    if (!deletedContact) {
      throw createHttpError(404, 'Contact not found');
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
