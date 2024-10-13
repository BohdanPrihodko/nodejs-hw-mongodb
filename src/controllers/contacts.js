// src/controllers/contacts.js
import createError from 'http-errors';

export const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = contacts.find((contact) => contact.id === contactId);

    if (!contact) {
      throw createError(404, 'Contact not found');
    }

    res.json({
      message: `Contact with ID ${contactId}`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
