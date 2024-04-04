
            import { Router } from 'express';
            import { create, find, update, destroy, findOne } from '../controllers/category.js';
            const router = Router();
        
            // Create category
            router.post("/api/categorys", [], create);
        
            // List categorys
            router.get("/api/categorys", [], find);
        
            // List Single category
            router.get("/api/categorys/:id", [], findOne);
        
            // Update categorys
            router.put("/api/categorys/:id", [], update);
        
            // Delete category
            router.delete("/api/categorys/:id", [], destroy);
        
            export default router;
          