import {addArticleStar, cancelArticleStar} from "@/api/article";
import Msg from "@/utils/message";

export default {
    methods: {
        executeStar(item) {
            if (!!item.is_star) {
                cancelArticleStar({
                    article_id: item.article_id
                }).then((res) => {
                    item.is_star = !item.is_star
                    item.star_count--
                }).catch(()=>{})

            } else {
                addArticleStar({
                    article_id: item.article_id,
                    target_id: item.user_id
                }).then(() => {
                    item.is_star = !item.is_star
                    item.star_count++
                }).catch(()=>{})
            }
        }
    }
}