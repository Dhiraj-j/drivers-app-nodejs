
                  import { getPagination, getMeta ,errorResponse } from "rapidjet"
                  import Message from "../models/message.js";
                  import { request, response } from "express";
              
                  export const create = async (req,res) => {
                      try {
                          const message = await Message.create(req.body);
                          return res.status(200).send(message);
                      } catch (error) {
                          console.log(error);
                          return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
                      }
                  };
              
                  export const find = async (req,res) => {
                      try {
                          const query = req.query;
                          const pagination = await getPagination(query.pagination);
                          const messages = await Message.findAndCountAll({
                              offset: pagination.offset,
                              limit: pagination.limit
                          });
                          const meta = await getMeta(pagination, messages.count);
                          return res.status(200).send({ data: messages.rows, meta });
                      } catch (error) {
                          console.log(error);
                          return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
                      }
                  };
              
                  export const findOne = async (req,res) => {
                      try {
                          const { id } = req.params;
                          const message = await Message.findByPk(id);
                          if (!message) {
                              return res.status(404).send(errorResponse({ status: 404, message: "message not found!" }));
                          }
                          return res.status(200).send({ data: message });
                      } catch (error) {
                          console.log(error);
                          return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
                      }
                  };
              
                  export const update = async (req,res) => {
                      try {
                          const { id } = req.params;
                          const getMessage = await Message.findByPk(id);
              
                          if (!getMessage) {
                              return res.status(400).send(errorResponse({ message: "Invalid ID" }));
                          }
              
                          const [rowCount, [message]] = await Message.update(req.body, { where: { id }, returning: true });
                          return res.status(200).send({ message: "message updated!", data: message });
                      } catch (error) {
                          console.log(error);
                          return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
                      }
                  };
              
                  export const destroy = async (req,res) => {
                      try {
                          const { id } = req.params;
                          const getMessage = await Message.findByPk(id);
              
                          if (getMessage) {
                              return res.status(400).send(errorResponse({ message: "Invalid ID" }));
                          }
              
                          const message = Message.destroy({ where: { id } });
                          return res.status(200).send({ message: "message deleted!" });
                      } catch (error) {
                          console.log(error);
                          return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
                      }
                  };
                