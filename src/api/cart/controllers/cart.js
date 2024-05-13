
import { getPagination, getMeta, errorResponse } from "rapidjet"
import Cart from "../models/cart.js";
import { responseHandler } from './../../../utils/responseHandler.js';
import { verify } from "../../../utils/jwt.js";
import CartItem from "../models/cartItem.js";
import Menu_item from './../../menu_item/models/menu_item.js';
import { Op } from "sequelize";

export const addToCart = async (req, res) => {
  try {
    const { menu_item_id, quantity } = req.body;

    const token = verify(req);
    if (token.error) {
      return res.status(401).send(responseHandler({
        status: 'failure',
        status_code: 401,
        message: "you're not authorized to access resource",
        request_body: req.body
      }))
    }
    console.log(token.id)
    let findCart = await Cart.findOne({ where: { UserId: token.id } });
    if (findCart === null) {
      findCart = await Cart.create({ total_price: 0, UserId: token.id });
    }

    const cartItems = await CartItem.findOne({
      where: {
        MenuItemId: menu_item_id,
        CartId: findCart.id,
      },
    });

    if (cartItems) {
      // findCart.increment({ total_price: menu_item.price * quantity });

      cartItems.quantity += quantity;
      await cartItems.save();
    } else {
      await CartItem.create({
        MenuItemId: menu_item_id,
        CartId: findCart.id,
        quantity: quantity,
      });
    }

    const menu_item = await Menu_item.findByPk(menu_item_id);
    findCart.increment({ total_price: menu_item.price * quantity });
    await findCart.save();
    const updatedCart = await Cart.findOne({ where: { UserId: token.id }, include: ['items'] })

    return res.status(200).send(responseHandler({
      status: 'success',
      status_code: 200,
      data: updatedCart,
      message: "item added to cart",
      request_body: req.body
    }))
  } catch (error) {
    console.log(error);
    return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, errors: error, message: error.message, request_body: req.body }))
  }
};

export const removeItemFromCart = async (req, res) => {
  try {
    const token = verify(req)
    const { menu_item_id } = req.params;
    if (token.error) {
      return res.status(401).send(responseHandler({
        status: 'failure',
        status_code: 401,
        message: "you're not authorized to access resource",
        request_body: req.body
      }))
    }


    let findCart = await Cart.findOne({ where: { UserId: token.id }, include: [{ model: Menu_item, as: "items", where: { id: menu_item_id } }] });


    if (findCart && findCart.items.length) {
      let itemsPrice = findCart.items.flatMap((item) => {
        return item.price * item.CartItem.quantity
      })[0]
      await CartItem.destroy({ where: { CartId: findCart.id, MenuItemId: menu_item_id } })

      findCart.decrement({ total_price: itemsPrice })
      await findCart.save();
    }

    const updatedCart = await Cart.findOne({ where: { UserId: token.id }, include: ["items"] })

    return res.status(200).send(responseHandler({ status: 'success', status_code: 200, message: "Item has been removed", data: updatedCart }));
  } catch (error) {
    console.log(error);
    return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, errors: error, message: error.message }))
  }
};
export const decreaseQuantity = async (req, res) => {
  try {
    const token = verify(req)
    const { menu_item_id } = req.params;

    if (token.error) {
      return res.status(401).send(responseHandler({
        status: 'failure',
        status_code: 401,
        message: "you're not authorized to access resource",
        request_body: req.body
      }))
    }

    let findCart = await Cart.findOne({ where: { UserId: token.id }, include: [{ model: Menu_item, as: "items", where: { id: menu_item_id } }] });


    if (findCart && findCart.items.length) {
      // if (findCart.items[0].CartItem.quantity <= 0) {
      //   await CartItem.destroy({ where: { CartId: findCart.id, MenuItemId: menu_item_id } })
      // }
      let itemsPrice = findCart.items[0].price
      await CartItem.decrement({ quantity: 1 }, { where: { CartId: findCart.id, MenuItemId: menu_item_id } })
      await findCart.decrement({ total_price: itemsPrice })
      await CartItem.destroy({ where: { quantity: { [Op.lte]: 0 } } });

    }
    const updatedCart = await Cart.findOne({ where: { UserId: token.id }, include: ["items"] })
    return res.status(200).send(responseHandler({ status: 'success', status_code: 200, message: "Item's quantity has been decreased", data: updatedCart }));
  } catch (error) {
    console.log(error);
    return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, errors: error, message: error.message }))
  }
};
export const increaseQuantity = async (req, res) => {
  try {
    const token = verify(req)
    const { menu_item_id } = req.params;

    if (token.error) {
      return res.status(401).send(responseHandler({
        status: 'failure',
        status_code: 401,
        message: "you're not authorized to access resource",
        request_body: req.body
      }))
    }

    let findCart = await Cart.findOne({ where: { UserId: token.id }, include: [{ model: Menu_item, as: "items", where: { id: menu_item_id } }] });

    if (findCart && findCart.items.length) {
      let itemsPrice = findCart.items[0].price
      await CartItem.increment({ quantity: 1 }, { where: { CartId: findCart.id, MenuItemId: menu_item_id } })
      await findCart.increment({ total_price: itemsPrice })
    }
    const updatedCart = await Cart.findOne({ where: { UserId: token.id }, include: ["items"] })
    return res.status(200).send(responseHandler({ status: 'success', status_code: 200, message: "Item's quantity has been decreased", data: updatedCart }));
  } catch (error) {
    console.log(error);
    return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, errors: error, message: error.message }))
  }
};

export const userCart = async (req, res) => {
  try {
    const token = verify(req)
    if (token.error) {
      return res.status(401).send(responseHandler({
        errors: token.error,
        message: "you're not authorized",
        status: 'failure',
        status_code: 401
      }))
    }
    let cart = await Cart.findOne({ where: { UserId: token.id, }, include: ["items"] });
    if (!cart) {
      cart = await Cart.create({ totalPrice: 0, UserId: token.id });
    }
    return res.status(200).send(responseHandler({
      status: 'success',
      status_code: 200,
      data: cart,
    }));
  } catch (error) {
    console.log(error);
    return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, errors: error, message: error.message }))
  }
};