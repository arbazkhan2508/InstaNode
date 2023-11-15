const methodOverride = require("method-override");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const fs = require("fs");
const { GridFsStorage } = require("multer-gridfs-storage");

const conn = mongoose.createConnection("mongodb://127.0.0.1:27017/insta");

const db = mongoose.connection;

var postStorage = new GridFsStorage({
  url: "mongodb://127.0.0.1:27017/insta",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "posts",
        };
        resolve(fileInfo);
      });
    });
  },
});

var storyStorage = new GridFsStorage({
  url: "mongodb://127.0.0.1:27017/insta",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "story",
        };
        resolve(fileInfo);
      });
    });
  },
});

var profileStorage = new GridFsStorage({
  url: "mongodb://127.0.0.1:27017/insta",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "profile",
        };
        resolve(fileInfo);
      });
    });
  },
});

const uploadposts = multer({ storage: postStorage });
const uploadstory = multer({ storage: storyStorage });
const uploadprofile = multer({ storage: profileStorage });
module.exports = { uploadposts, uploadprofile, uploadstory };
