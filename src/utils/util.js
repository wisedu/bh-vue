
export default {
    arr: {
        /**
         * 从数组中查找元素，返回元素index
         * @param  {value} item   标题
         * @param  {String} array 内容，支持包含vue组件的html字符串
         * @param  {Function} compare  元素相等的对比函数
         */
        findIndex (item, array, compare) {
            if(!array) return -1;
            if(compare) {
                for (let i = 0; i < array.length; i++) {
                    let cpResult = compare(item, array[i] );
                    if (cpResult) {
                        return i;
                    }
                }
                return -1;
            }

            for (let j = 0; j < array.length; j++) {
                if (item == array[j] ) {
                    return i;
                }
            }
            return -1;
        }
    }




}
