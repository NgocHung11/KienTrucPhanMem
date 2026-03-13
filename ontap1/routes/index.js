const Router = require("express").Router;
const multer = require("multer");
const controller = require("../controllers/index");

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", controller.home);
router.post("/subjects", upload.single("imageFile"), controller.createSubject);
router.post(
  "/subjects/:id/update",
  upload.single("imageFile"),
  controller.updateSubject
);
router.post("/subjects/:id/delete", controller.deleteSubject);

module.exports = router;
