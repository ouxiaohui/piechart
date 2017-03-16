# piechart
圆饼图
    ![bing](http://thumbnail0.baidupcs.com/thumbnail/97454a5f86c207d435f7ee024705a6a9?fid=1600633756-250528-815870538437704&time=1489647600&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-kXoLzq%2fUfk7rwnaTc1JKb8mLoS4%3d&expires=8h&chkbd=0&chkv=0&dp-logid=1730977420432425229&dp-callid=0&size=c1366_u768&quality=90)
* 配置 （content为需要显示内容，config的属性如不输入则为默认）
 `
  /**
     * drawEftCircleComponent 百分比圈
     * @param selector [string] canvas 选择器id
     * @param content [Array] canvas 数组每一项 {对应的百分比, 内容, 单位, 数据}
     * @param config [object] canvas 圆环的属性值
     */
     var defaultConfig = {
            width: 650,// 画布的宽度
            height: 260,// 画布的高度
            lineWidth: 12,// 圆弧的粗细
            unit: '人',  //统计的单位
            radius: 101,  //最外层圆 半径
            centerX: 110,  //相对于画布的圆心位置X
            centerY: 110,  //相对于画布的圆心位置Y
            marginTop: 45, //说明文字到画布 顶部的距离
            desLineWidth: 20,  //说明条的长度
            desToX: 304,  //文字到画布左边距离
            desToY: 43,  //文字到画布上边距离
            lineToX: 256,  //说明条到画布左边距离
            lineToY: 45,  //说明条到画布上边距离
            percentToX: 411,  //百分比到左边距离
            percentToY: 45,  //百分比到上边距离
            numToX: 496,  //数字到画布左边距离
            numToY: 45,  //数字到画布上边距离
            unitToX: 540,  //单位到画布左边距离
            unitToY: 45,  //单位到画布上边距离
            eachDesHeight: 37, //说明条每个之间的间距（包括字体和间距）
            bgcolor: ['#3b3538', '#373134', '#352f32', '#322c2f', '#2a2427'],  //（从外到内）五个圆环底色
            font: {// 字体配置
                fontSize: '14', // 每项说明文字 (单位pt)
                fontFamily: 'Calibri',
                textAlign: 'center',
                color: '#FFFFFF', //文字颜色 
                fontSize_small: '12',  //小字 (单位pt)
                circle_fontSize: '19' //圈内大字 (单位pt)
            }
        };
        var aArray = [ // （从外到内）数据(百分比，人数，名字，渐变色[4个])
          {
              rate: '0.2',
              num: 3210,
              name: '新客户',
              linears: ['#b8ff86', '#93d272', '#72c98f', '#5ac2a0']
          },
          {
              rate: '0.5',
              num: 6240,
              name: '主力客户',
              linears: ["#ff9d76", "#ffad6c", "#ffb76a", "#ffc064"]
          },
          {
              rate: '0.18',
              num: 2808,
              name: '瞌睡客户',
              linears: ['#56abe7', '#49aee1', '#36b4d8', '#23b9cf']
          },
          {
              rate: '0.12',
              num: 1872,
              name: '休睡客户',
              linears: ['#f3ce56', '#efce56', '#d7d05e', '#c0d162']
          },
          {
              rate: '0.1',
              num: 1560,
              name: '沉睡客户',
              linears: ['#9098f0', '#9495ea', '#aa8fcf', '#c785a3']
          }
      ]
      drawEftCircleComponent('customer-effective', aArray, {
          unit: '个'
      });
    `
        
