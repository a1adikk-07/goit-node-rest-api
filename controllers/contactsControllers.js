import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { contactModel } from "../models/contacts.js";

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page, limit, favorite } = req.query;
  const skip = page ? (page - 1) * limit : 0;
  const conditions = { owner };

  if (favorite) conditions.favorite = favorite;

  const contacts = await contactModel.find(
    conditions,
    "-createdAt -updatedAt",
    {
      skip,
      limit: limit || 0,
    }
  );
  res.json(contacts);
};

const getOneContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const contact = await contactModel.findOne({ _id: id, owner });

  if (!contact) throw HttpError(400, `not valid id or has been deleted`);
  res.json(contact);
};

const deleteContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const contact = await contactModel.findOne({ _id: id, owner });
  if (!contact) throw HttpError(404);
  await contactModel.findByIdAndDelete(id);
  res.json(contact);
};

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { _id: owner } = req.user;

  const contact = await contactModel.create({ name, email, phone, owner });

  res.status(201).json(contact);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactModel.findOne({ _id: id, owner });
  const empty = Object.keys(req.body).length === 0;

  if (!contact) throw HttpError(404);

  if (empty) throw HttpError(400, "Body must have at least one field");

  await contactModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(contact);
};

const updateContactsStatus = async (req, res, next) => {
  const { id } = req.params;

  const contact = await contactModel.findOne({ _id: id, owner });

  if (!contact) throw HttpError(404);
  await contactModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
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
