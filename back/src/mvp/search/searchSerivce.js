import { 미완성 } from "../db"

// educatuinRouter에 사용 할 Service 함수 등록
class searchSerivce {
  static async getSearchList({ category }) {

    const search = await Search.findByCategory({ category })
    if (!search) {
      const errorMessage = "해당 카테고리의 데이터는 없습니다."
      return { errorMessage }
    }
    return search
  }
}


export { searchSerivce }