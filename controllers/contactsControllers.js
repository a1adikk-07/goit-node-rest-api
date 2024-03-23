import * as contactsServices from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const getAllContacts = async (req, res, next) => {
  const contacts = await contactsServices.listContacts();
  res.json(contacts);
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;

  const contact = await contactsServices.getContactById(id);

  if (!contact) throw HttpError(404);
  res.json(contact);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;

  const contact = await contactsServices.removeContact(id);

  if (!contact) throw HttpError(404);
  res.json(contact);
};

const createContact = async (req, res, next) => {
  const { name, email, body } = req.body;

  const contact = await contactsServices.addContact(name, email, body);

  if (!contact) throw HttpError(404);

  res.status(201).json(contact);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;

  const empty = Object.keys(req.body).length === 0;

  if (empty) throw HttpError(400, "Body must have at least one field");

  const contact = await contactsServices.updContact(id, req.body);

  if (!contact) throw HttpError(404);
  res.json(contact);
};

export const ctrl = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
