// src/services/contacts.js
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import Contact from '../db/models/contacts.js';

// Отримання всіх контактів
export const getAllContacts = ctrlWrapper(async () => {
  return await Contact.find();
});

// Отримання контакту за ID
export const getContactById = ctrlWrapper(async (contactId) => {
  return await Contact.findById(contactId);
});

// Оновлення контакту за ID
export const updateContactById = ctrlWrapper(async (contactId, updates) => {
  return await Contact.findByIdAndUpdate(contactId, updates, { new: true });
});

// Видалення контакту за ID
export const deleteContactById = ctrlWrapper(async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
});

// Створення нового контакту
export const createContact = ctrlWrapper(async (contactData) => {
  return await Contact.create(contactData);
});
