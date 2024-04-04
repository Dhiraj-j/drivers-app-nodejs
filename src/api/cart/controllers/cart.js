
import { getPagination, getMeta, errorResponse } from "rapidjet"
import Cart from "../models/cart.js";
import { request, response } from "express";

export const create = async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    return res.status(200).send(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
  }
};

export const find = async (req, res) => {
  try {
    const query = req.query;
    const pagination = await getPagination(query.pagination);
    const carts = await Cart.findAndCountAll({
      offset: pagination.offset,
      limit: pagination.limit
    });
    const meta = await getMeta(pagination, carts.count);
    return res.status(200).send({ data: carts.rows, meta });
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
  }
};

export const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByPk(id);
    if (!cart) {
      return res.status(404).send(errorResponse({ status: 404, message: "cart not found!" }));
    }
    return res.status(200).send({ data: cart });
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const getCart = await Cart.findByPk(id);

    if (!getCart) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }

    const [rowCount, [cart]] = await Cart.update(req.body, { where: { id }, returning: true });
    return res.status(200).send({ message: "cart updated!", data: cart });
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
  }
};

export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const getCart = await Cart.findByPk(id);

    if (getCart) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }

    const cart = Cart.destroy({ where: { id } });
    return res.status(200).send({ message: "cart deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
  }
};
