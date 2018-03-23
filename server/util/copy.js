const fs = require('fs');
const path = require('path');
/*
 * 复制目录中的所有文件包括子目录
 * @src param{ String } 需要复制的目录   例 images 或者 ./images/
 * @dst param{ String } 复制到指定的目录    例 images images/
 */
const filePath = path.resolve();
const copy = function (src,dst) {
  //判断文件需要时间，则必须同步
  if(fs.existsSync(src)){

  }
}
