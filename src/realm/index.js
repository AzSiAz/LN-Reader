// type": "Light_novel",
// "language": "English",
// "titles": [
//   {
//     "page": "A_Simple_Survey",
//     "title": "A Simple Survey",
//     "lastreviseddate": "2016-10-07T05:00:18Z",
//     "lastrevisedid": 503967,
//     "pageid": 25797
//   },

import Realm from 'realm'

import { CacheSchema } from './cache'
import { ChapterSchema } from './chapter'
import { NovelSchema, OneShotNovelSchema } from './novel'

export default Realm.open({
    schema: [ NovelSchema, OneShotNovelSchema, CacheSchema, ChapterSchema ]
})
