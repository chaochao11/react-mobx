/**
 *  Created by xiaosong 2017/09/15.
 * **/

import _ from 'lodash';
import ChartStore from './ChartStore.js';
import MenuStore from './MenuStore.js';

const appStore = {};

export default ()=>{
    if(_.isEmpty(appStore)){
        const storeMap = {      // 每定义一个store都需要在这进行引入，然后在界面inject注册,
            ChartStore,
            MenuStore
        };
        Object.keys(storeMap).forEach(store=>{      //我用来把store的首字母全部转成小写啦，不是必须
            appStore[_.lowerFirst(store)] = new storeMap[store]()
        })
    }
    return appStore
}