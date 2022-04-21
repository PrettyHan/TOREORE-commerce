import is from "@sindresorhus/is";
import { Router } from "express";
import { searchSerivce } from "./searchSerivce";

const searchRouter = Router();

// 대분류 카테고리
searchRouter.get("/searchCategory/:category", async function (req, res, next) {
    try {
      const category = req.params.category
      const searchList = await searchSerivce.getSearchList({ category });
      res.status(200).send(searchList);
    } catch (error) {
      next(error);
    }
  });

// 전체 검색 





export { searchRouter }