/**
 * 自定义全局方法 v3.0
 * */
import { getCategoryApi } from "@/api/news";
import { reactive } from "@vue/composition-api";
//获取分类信息
export function common() {
  const categoryInfo = reactive({ item: [] });
  const getInfoCategory = () => {
    getCategoryApi()
      .then(res => {
        const data = res.data.data;
        categoryInfo.item = data.data;
      })
      .catch();
  };
  return {
    categoryInfo,
    getInfoCategory
  };
}
