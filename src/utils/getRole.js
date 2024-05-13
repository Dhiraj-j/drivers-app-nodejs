import Role from "../api/role/models/role.js";

export default async function (name) {
    const role = await Role.findOne({ where: { name: name } })
    return role.id
}