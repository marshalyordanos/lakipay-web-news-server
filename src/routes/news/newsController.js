const { News } = require("../../models");
const AppErorr = require("../../utils/appError");
const APIFeature = require("../../utils/apiFeature");
const filterObj = require("../../utils/pick");
const catchAsync = require("../../utils/catchAsync");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

/**************** multer storage ************************* */
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/news");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".")[1];
    cb(null, `user-${uuidv4()}-${Date.now()}.${ext}`);
  },
});
/******************** multer fields ************************ */
const multerFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const uploadUserPhoto = upload.single("image");

const createNews = catchAsync(async (req, res, next) => {
  const protocol = req.protocol; // 'http' or 'https'
  const host = req.get("host"); // includes hostname and port
  const baseUrl = `${protocol}://${host}`;
  if (req.file) {
    req.body.image = baseUrl + "/img/news/" + req.file.filename;
  }
  console.log("-----------------------------", req.body);

  const news = await News.create(req.body);

  res.status(201).json({
    status: "success",
    data: news,
  });
});

const searchNewss = catchAsync(async (req, res, next) => {
  const { limit, page } = req.query;
  const limit2 = limit || 10;
  const page2 = page || 1;

  const offset = (page2 - 1) * limit || 0;

  let Newss = await News.findAll({
    // order: [["date", "DESC"]],

    limit: limit2,
    offset: offset,
  });

  const count = await News.count();

  res.status(200).json({
    status: "success2",
    total: count,
    data: Newss,
  });
});

const getNews = catchAsync(async (req, res, next) => {
  const news = await News.findById({ _id: req.params.id });
  if (!news) {
    return next(new AppErorr("There is not news in this ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: news,
  });
});

const updateNews = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const news = await News.findByPk(id);

  const protocol = req.protocol; // 'http' or 'https'
  const host = req.get("host"); // includes hostname and port
  const baseUrl = `${protocol}://${host}`;
  if (req.file) {
    req.body.image = baseUrl + "/img/news/" + req.file.filename;
  }

  if (!news) {
    return next(new AppErorr("news is not found!", 404));
  }

  await news.update(req.body);

  res.status(201).json({
    status: "success",
    message: "The News is updated successfully!",
    data: news,
  });
});

const deleteNews = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const news = await News.findByPk(id);

  if (!news) {
    return next(new AppErorr("news is not found!", 404));
  }

  await news.destroy();

  res.status(205).json({
    status: "success",
    message: "The News is  deleted!",
    data: null,
  });
});

const newsListDo = catchAsync(async (req, res, next) => {
  const { method, payload } = req.body;

  const method_list = ["add_list_to_news", "method2"];

  if (method_list.includes(method) && method == "add_list_to_news") {
    try {
      for (let news of payload.data) {
        const filteredBody = filterObj(news, "news_name");

        const newNews = new News(filteredBody);
        await newNews.save();
      }

      res.status(201).json({
        status: "success",
        message: "The News is created successfully!",
      });
    } catch (err) {
      return next(new AppErorr("Something is wrong!", 400));
    }
  } else if (method_list.includes(method) && method == "medthod2") {
  }

  return next(new AppErorr("method is not found!", 404));
});

const newsDetailDo = catchAsync(async (req, res, next) => {
  const { method, payload } = req.body;
  const { id } = req.params;

  const method_list = ["method1", "method2"];

  if (method_list.includes(method) && method == "method1") {
  } else if (method_list.includes(method) && method == "medthod2") {
  }

  return next(new AppErorr("method is not found!", 404));
});

module.exports = {
  createNews,
  searchNewss,
  getNews,
  updateNews,
  deleteNews,
  newsListDo,
  newsDetailDo,
  uploadUserPhoto,
};
