import { Router } from "express";
import { errorResponse } from "rapidjet";
import { upload } from "../../utils/upload.js";
const router = Router();

router.post("/api/uploads", [upload.any()], (req, res) => {
    try {
        return res.status(200).send({ data: req.files })
    } catch (error) {
        return res.status(200).send(errorResponse({ message: error.message }))
    }
})

export default router;