const SubjectModel = require("../models/index");
const { s3 } = require("../utils/aws-helper");

const bucketName = process.env.BUCKET_NAME;
const cloudfrontUrl = process.env.CLOUDFRONT_URL;
const region = process.env.REGION;

const getObjectKeyFromUrl = imageUrl => {
  if (!imageUrl || !bucketName) return "";

  if (cloudfrontUrl) {
    const normalizedCloudfrontUrl = cloudfrontUrl.replace(/\/$/, "");
    const cloudfrontPrefix = `${normalizedCloudfrontUrl}/`;
    if (imageUrl.startsWith(cloudfrontPrefix)) {
      return decodeURIComponent(imageUrl.slice(cloudfrontPrefix.length));
    }
  }

  try {
    const parsedUrl = new URL(imageUrl);
    const pathname = parsedUrl.pathname.replace(/^\/+/, "");

    const virtualHostedStyleHosts = [
      `${bucketName}.s3.${region}.amazonaws.com`,
      `${bucketName}.s3.amazonaws.com`,
    ];

    if (virtualHostedStyleHosts.includes(parsedUrl.host)) {
      return decodeURIComponent(pathname);
    }

    const pathStyleHosts = [
      `s3.${region}.amazonaws.com`,
      "s3.amazonaws.com",
    ];

    if (
      pathStyleHosts.includes(parsedUrl.host) &&
      pathname.startsWith(`${bucketName}/`)
    ) {
      return decodeURIComponent(pathname.slice(bucketName.length + 1));
    }
  } catch (_error) {
    return "";
  }

  return "";
};

const deleteImageFromS3 = async imageUrl => {
  const objectKey = getObjectKeyFromUrl(imageUrl);
  if (!objectKey || !bucketName) return;

  await s3
    .deleteObject({
      Bucket: bucketName,
      Key: objectKey,
    })
    .promise();
};

const getUploadedUrl = key => {
  if (cloudfrontUrl) {
    return `${cloudfrontUrl.replace(/\/$/, "")}/${key}`;
  }
  return `https://${bucketName}.s3.${process.env.REGION}.amazonaws.com/${key}`;
};

const uploadToS3 = async file => {
  if (!file || !bucketName) return "";

  const objectKey = `subjects/${Date.now()}-${file.originalname}`;
  await s3
    .putObject({
      Bucket: bucketName,
      Key: objectKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
    .promise();

  return getUploadedUrl(objectKey);
};

const parseError = error => error?.message || "Có lỗi xảy ra";

const IndexController = {
  home: async (req, res) => {
    try {
      const subjects = await SubjectModel.getSubjects();
      return res.render("index", {
        subjects,
        error: null,
        success: req.session.success || null,
      });
    } catch (error) {
      return res.render("index", {
        subjects: [],
        error: parseError(error),
        success: null,
      });
    } finally {
      req.session.success = null;
    }
  },

  createSubject: async (req, res) => {
    try {
      const imageUrl = req.file
        ? await uploadToS3(req.file)
        : req.body.image || "";

      await SubjectModel.createSubject({
        name: req.body.name,
        type: req.body.type,
        semester: req.body.semester,
        faculty: req.body.faculty,
        image: imageUrl,
      });
      req.session.success = "Tạo môn học thành công";
      return res.redirect("/");
    } catch (error) {
      req.session.success = null;
      return res.status(500).send(parseError(error));
    }
  },

  updateSubject: async (req, res) => {
    try {
      const imageUrl = req.file
        ? await uploadToS3(req.file)
        : req.body.image || req.body.currentImage || "";

      await SubjectModel.updateSubject(req.params.id, req.body.nameKey, {
        type: req.body.type,
        semester: req.body.semester,
        faculty: req.body.faculty,
        image: imageUrl,
      });

      req.session.success = "Cập nhật môn học thành công";
      return res.redirect("/");
    } catch (error) {
      req.session.success = null;
      return res.status(500).send(parseError(error));
    }
  },

  deleteSubject: async (req, res) => {
    try {
      const subject = await SubjectModel.getSubjectByKey(
        req.params.id,
        req.body.nameKey
      );

      if (!subject) {
        return res.status(404).send("Không tìm thấy môn học");
      }

      await deleteImageFromS3(subject.image);
      await SubjectModel.deleteSubject(req.params.id, req.body.nameKey);
      req.session.success = "Xóa môn học thành công";
      return res.redirect("/");
    } catch (error) {
      req.session.success = null;
      return res.status(500).send(parseError(error));
    }
  },
};

module.exports = IndexController;
