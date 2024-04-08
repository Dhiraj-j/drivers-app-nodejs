
            import { Router } from 'express';
            import { create, find, update, destroy, findOne } from '../controllers/menu_category.js';
            const router = Router();
        
            // Create menu_category
            router.post("/api/menu_categorys", [], create);
        
            // List menu_categorys
            router.get("/api/menu_categorys", [], find);
        
            // List Single menu_category
            router.get("/api/menu_categorys/:id", [], findOne);
        
            // Update menu_categorys
            router.put("/api/menu_categorys/:id", [], update);
        
            // Delete menu_category
            router.delete("/api/menu_categorys/:id", [], destroy);
        
            export default router;
          