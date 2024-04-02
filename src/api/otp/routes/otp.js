
            import { Router } from 'express';
            import { create, find, update, destroy, findOne } from '../controllers/otp.js';
            const router = Router();
        
            // Create otp
            router.post("/api/otps", [], create);
        
            // List otps
            router.get("/api/otps", [], find);
        
            // List Single otp
            router.get("/api/otps/:id", [], findOne);
        
            // Update otps
            router.put("/api/otps/:id", [], update);
        
            // Delete otp
            router.delete("/api/otps/:id", [], destroy);
        
            export default router;
          