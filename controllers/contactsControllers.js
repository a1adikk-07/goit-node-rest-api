import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { contactModel } from "../models/contacts.js";

const getAllContacts = async (req, res, next) => {
  const contacts = await contactModel.find();
  res.json(contacts);
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;

  const contact = await contactModel.findById(id);

  if (!contact) throw HttpError(400, `not valid id or has been deleted`);
  res.json(contact);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;

  const contact = await contactModel.findByIdAndDelete(id);
  if (!contact) throw HttpError(404);
  res.json(contact);
};

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  const contact = await contactModel.create({ name, email, phone });

  if (!contact) throw HttpError(404);

  res.status(201).json(contact);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;

  const empty = Object.keys(req.body).length === 0;

  if (empty) throw HttpError(400, "Body must have at least one field");

  const contact = await contactModel.findByIdAndUpdate(id, req.body);

  if (!contact) throw HttpError(404);
  res.json(contact);
};

const updateContactsStatus = async (req, res, next) => {
  const { id } = req.params;

  const contact = await contactModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!contact) throw HttpError(404);

  res.json(contact);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateContactsStatus: ctrlWrapper(updateContactsStatus),
};
