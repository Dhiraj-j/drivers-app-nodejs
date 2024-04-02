
            import { Router } from 'express';
            import { create, find, update, destroy, findOne } from '../controllers/message.js';
            const router = Router();
        
            // Create message
            router.post("/api/messages", [], create);
        
            // List messages
            router.get("/api/messages", [], find);
        
            // List Single message
            router.get("/api/messages/:id", [], findOne);
        
            // Update messages
            router.put("/api/messages/:id", [], update);
        
            // Delete message
            router.delete("/api/messages/:id", [], destroy);
        
            export default router;
          