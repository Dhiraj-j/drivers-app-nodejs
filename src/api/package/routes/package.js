
            import { Router } from 'express';
            import { create, find, update, destroy, findOne } from '../controllers/package.js';
            const router = Router();
        
            // Create package
            router.post("/api/packages", [], create);
        
            // List packages
            router.get("/api/packages", [], find);
        
            // List Single package
            router.get("/api/packages/:id", [], findOne);
        
            // Update packages
            router.put("/api/packages/:id", [], update);
        
            // Delete package
            router.delete("/api/packages/:id", [], destroy);
        
            export default router;
          