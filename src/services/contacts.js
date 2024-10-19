// src/services/contacts.js

import Contact from '../db/models/contacts.js';

// Отримання всіх контактів
export const getAllContacts = async () => {
  return await Contact.find();
};

// Отримання контакту за ID
export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

// Оновлення контакту за ID
export const updateContactById = async (contactId, updates) => {
  return await Contact.findByIdAndUpdate(contactId, updates, { new: true });
};

// Видалення контакту за ID
export const deleteContactById = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};

// Створення нового контакту
export const createContact = async (contactData) => {
  return await Contact.create(contactData);
};
