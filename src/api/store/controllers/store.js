
import Store from "../models/store.js";
import { responseHandler } from "../../../utils/responseHandler.js";
import Store_type from "../../store_type/models/store_type.js";
import sequelize from "../../../../database/index.js";

export const create = async (req, res) => {
    try {
        const body = req.body;
        const store = await Store.create(body);
        if (body.menu_category_ids && body.menu_category_ids.length) {
            const store_menu_category_array = body.menu_category_ids.map((item) => {
                return {
                    StoreId: store.dataValues.id,
                    MenuCategoryId: item
                }
            })
            await sequelize.models.Store_menu_category.bulkCreate(store_menu_category_array)
        }
        return res.status(200).send(responseHandler({
            data: store,
            message: "store created",
            request_body: body,
            status: "success",
            status_code: 200
        }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failure", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const find = async (req, res) => {
    try {
        const query = req.query;
        const whereClause = {};
        if (query.store_type) {
            whereClause.name = query?.store_type?.toLowerCase()
        }
        const stores = await Store.findAll({
            attributes: {
                include: [
                    [sequelize.literal('(SELECT ROUND(AVG("rating"), 1) FROM "Store_reviews" WHERE "Store_reviews"."StoreId" = "Store"."id")'), "rating"],
                ],
            },
            include: [{ model: Store_type, as: "store_type", where: whereClause }]
        });
        return res.status(200).send(responseHandler({ status_code: 200, status: "success", data: stores, request_body: req.body }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failure", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findByPk(id, {
            include: ["menu_categories"],
            attributes: {
                include: [
                    [sequelize.literal('(SELECT ROUND(AVG("rating"), 1) FROM "Store_reviews" WHERE "Store_reviews"."StoreId" = "Store"."id")'), "rating"],
                ],
            },
        });
        if (!store) {
            return res.status(404).send(responseHandler({
                status_code: 404,
                message: "store not found!",
                status: "failure",
                request_body: req.body
            }));
        }
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, request_body: req.body, data: store }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failure", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const update = async (req, res) => {
    try {
        const body = req.body;
        const { id } = req.params;
        const getStore = await Store.findByPk(id);

        if (body.menu_category_ids && body.menu_category_ids.length) {
            const store_menu_category_array = body.menu_category_ids.map((item) => {
                return {
                    StoreId: store.dataValues.id,
                    MenuCategoryId: item
                }
            })
            await sequelize.models.Store_menu_category.bulkCreate(store_menu_category_array, {
                updateOnDuplicate: ["StoreId", "MenuCategoryId"]
            })
        }

        if (!getStore) {
            return res.status(404).send(responseHandler({
                status_code: 404,
                message: "store not found!",
                status: "failure",
                request_body: req.body
            }));
        }

        const [rowCount, [store]] = await Store.update(req.body, { where: { id }, returning: true });
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, request_body: req.body, data: store }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failure", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getStore = await Store.findByPk(id);

        if (!getStore) {
            return res.status(404).send(responseHandler({
                status_code: 404,
                message: "store not found!",
                status: "failure",
                request_body: req.body
            }));
        }

        const store = Store.destroy({ where: { id } });
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, request_body: req.body, data: store }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failure", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const deleteMenuCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { menu_category_id } = req.params;
        await sequelize.models.Store_menu_category.destroy({ where: { StoreId: id, MenuCategoryId: menu_category_id } })
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, message: "menu category deleted" }))
    } catch (error) {
        return res.status(500).send(responseHandler({
            status: 'failure', status_code: 500,
            errors: error,
            request_body: req.body,
            message: error.message
        }))
    }
}

export const addMenuCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { menu_category_id } = req.params;
        const store = await Store.findByPk(id)
        console.log(store)
        if (!store) {
            return res.status(404).send(responseHandler({ status: 'failure', status_code: 404, message: "store not found" }))
        }
        await sequelize.models.Store_menu_category.create({ StoreId: id, MenuCategoryId: menu_category_id })
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, message: "menu category deleted" }))
    } catch (error) {
        return res.status(500).send(responseHandler({
            status: 'failure', status_code: 500,
            errors: error,
            request_body: req.body,
            message: error.message
        }))
    }
}
