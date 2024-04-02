import app from "../../app.js";
import user from "../api/user/routes/user.js";

app.get("/api/users", (rq, res) => {
    res.status(200).send("ok")
})
app.use(user)