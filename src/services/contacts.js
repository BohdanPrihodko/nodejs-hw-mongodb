// src/services/contacts.js
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import Contact from '../db/models/contacts.js';

// Отримання всіх контактів користувача
export const getAllContacts = ctrlWrapper(async (userId) => {
  return await Contact.find({ userId });
});

// Отримання контакту за ID
export const getContactById = ctrlWrapper(async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, userId });
});

// Оновлення контакту за ID
export const updateContactById = ctrlWrapper(async (contactId, updates, userId) => {
  return await Contact.findOneAndUpdate({ _id: contactId, userId }, updates, { new: true });
});

// Видалення контакту за ID
export const deleteContactById = ctrlWrapper(async (contactId, userId) => {
  return await Contact.findOneAndDelete({ _id: contactId, userId });
});

// Створення нового контакту з userId
export const createContact = ctrlWrapper(async (contactData, userId) => {
  return await Contact.create({ ...contactData, userId });
});
