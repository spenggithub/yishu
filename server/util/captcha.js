const fs = require('fs');
const BMP24 = require('gd-bmp').BMP24;
class Captcha {
  //生成随机字符串
  static makeStr(){
    let p = "ABCDEFGHKMNPQRSTUVWXYZ3456789";
    let str='';
    for(let i=0; i<5; i++){
      str += p.charAt(Math.random() * p.length |0);
    }
    return str
  }
  //   随机函数
  static rand(min, max) {
    return Math.random()*(max-min+1) + min | 0; //特殊的技巧，|0可以强制转换为整数
  }
  static makeCapcha(str){
    let img = new BMP24(140, 50);
    img.drawCircle(Captcha.rand(0, 100), Captcha.rand(0, 40), Captcha.rand(10 , 40), Captcha.rand(0, 0xffffff));
    //边框
    img.drawRect(0, 0, img.w-1, img.h-1, Captcha.rand(0, 0xffffff));
    img.fillRect(Captcha.rand(0, 100), Captcha.rand(0, 40), Captcha.rand(10, 35), Captcha.rand(10, 35), Captcha.rand(0, 0xffffff));
    img.drawLine(Captcha.rand(0, 100), Captcha.rand(0, 40), Captcha.rand(0, 100), Captcha.rand(0, 40), Captcha.rand(0, 0xffffff));
    //return img;
    //画曲线
    var w=img.w/2;
    var h=img.h;
    var color = Captcha.rand(0, 0xffffff);
    var y1=Captcha.rand(-5,5); //Y轴位置调整
    var w2=Captcha.rand(10,15); //数值越小频率越高
    var h3=Captcha.rand(4,6); //数值越小幅度越大
    var bl = Captcha.rand(1,5);
    for(var i=-w; i<w; i+=0.1) {
      var y = Math.floor(h/h3*Math.sin(i/w2)+h/2+y1);
      var x = Math.floor(i+w);
      for(var j=0; j<bl; j++){
        img.drawPoint(x, y+j, color);
      }
    }
    var fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32];
    var x = 15, y=8;
    for(var i=0; i<str.length; i++){
      var f = fonts[Math.random() * fonts.length |0];
      y = 8 + Captcha.rand(-10, 10);
      img.drawChar(str[i], x, y, f, Captcha.rand(0, 0xffffff));
      x += f.w + Captcha.rand(2, 8);
    }
    return img;
  }
}
/*
 用PCtoLCD2002取字模
 行列式扫描，正向取模（高位在前）
 */
var cnfonts = {//自定义字模
  w : 16,
  h : 16,
  fonts: "中国",
  data : [
    [0x01,0x01,0x01,0x01,0x3F,0x21,0x21,0x21,0x21,0x21,0x3F,0x21,0x01,0x01,0x01,0x01,0x00,0x00,0x00,0x00,0xF8,0x08,0x08,0x08,0x08,0x08,0xF8,0x08,0x00,0x00,0x00,0x00],/*"中",0*/
    [0x00,0x7F,0x40,0x40,0x5F,0x41,0x41,0x4F,0x41,0x41,0x41,0x5F,0x40,0x40,0x7F,0x40,0x00,0xFC,0x04,0x04,0xF4,0x04,0x04,0xE4,0x04,0x44,0x24,0xF4,0x04,0x04,0xFC,0x04],/*"国",1*/
  ]
};
//仿PHP的rand函数
//制造验证码图片
module.exports = Captcha
