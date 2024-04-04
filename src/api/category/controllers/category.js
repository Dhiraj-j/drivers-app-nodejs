
                  import { getPagination, getMeta ,errorResponse } from "rapidjet"
                  import Category from "../models/category.js";
                  import { request, response } from "express";
              
                  export const create = async (req,res) => {
                      try {
                          const category = await Category.create(req.body);
                          return res.status(200).send(category);
                      } catch (error) {
                          console.log(error);
                          return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
                      }
                  };
              
                  export const find = async (req,res) => {
                      try {
                          const query = req.query;
                          const pagination = await getPagination(query.pagination);
                          const categorys = await Category.findAndCountAll({
                              offset: pagination.offset,
                              limit: pagination.limit
                          });
                          const meta = await getMeta(pagination, categorys.count);
                          return res.status(200).send({ data: categorys.rows, meta });
                      } catch (error) {
                          console.log(error);
                          return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
                      }
                  };
              
                  export const findOne = async (req,res) => {
                      try {
                          const { id } = req.params;
                          const category = await Category.findByPk(id);
                          if (!category) {
                              return res.status(404).send(errorResponse({ status: 404, message: "category not found!" }));
                          }
                          return res.status(200).send({ data: category });
                      } catch (error) {
                          console.log(error);
                          return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
                      }
                  };
              
                  export const update = async (req,res) => {
                      try {
                          const { id } = req.params;
                          const getCategory = await Category.findByPk(id);
              
                          if (!getCategory) {
                              return res.status(400).send(errorResponse({ message: "Invalid ID" }));
                          }
              
                          const [rowCount, [category]] = await Category.update(req.body, { where: { id }, returning: true });
                          return res.status(200).send({ message: "category updated!", data: category });
                      } catch (error) {
                          console.log(error);
                          return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
                      }
                  };
              
                  export const destroy = async (req,res) => {
                      try {
                          const { id } = req.params;
                          const getCategory = await Category.findByPk(id);
              
                          if (getCategory) {
                              return res.status(400).send(errorResponse({ message: "Invalid ID" }));
                          }
              
                          const category = Category.destroy({ where: { id } });
                          return res.status(200).send({ message: "category deleted!" });
                      } catch (error) {
                          console.log(error);
                          return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
                      }
                  };
                