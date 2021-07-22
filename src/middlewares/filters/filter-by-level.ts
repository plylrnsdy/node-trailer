import { levelWeight } from "@/core/levels";
import filter from "@/middlewares/filters/filter";


const filterByLevel = filter(({ options, level }) =>
  levelWeight[options.level] <= levelWeight[level]
)

export default filterByLevel
