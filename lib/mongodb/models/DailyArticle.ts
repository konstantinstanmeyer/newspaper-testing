import type { DailyArticleModel } from "../types";
import mongoose, { Schema, models } from "mongoose";

const DailyArticleSchema = new Schema<DailyArticleModel>(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    publication: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    imageAlt: {
      type: String,
      required: false,
    },
    paragraphCount: {
      type: Number,
      required: false,
    },
    content: [
      {
        type: String,
        required: true
      }
    ],
  },
  { timestamps: true }
);

const DailyArticle = models.DailyArticle || mongoose.model("DailyArticle", DailyArticleSchema);
export default DailyArticle;