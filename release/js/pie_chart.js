window.onload = function () {
    /**
     * drawEftCircleComponent 百分比圈
     * @param selector [string] canvas 选择器id
     * @param content [Array] canvas 数组每一项 {对应的百分比, 内容, 单位, 数据}
     * @param config [object] canvas 圆环的属性值
     */
    function drawEftCircleComponent(selector, content, config) {
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
        var eftCircleArray = [ // （从外到内）新客、主力客户、 瞌睡客户、 休睡客户、 沉睡客户对应的颜色和数据
            {
                rate: '0.2',
                num: 3210,
                name: '新客户',
                linears: ['#98d36f', '#93d272', '#72c98f', '#5ac2a0']
            },
            {
                rate: '0.4',
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

        function initConfit(data, defaultConfig) {
            // 初始化配置
            if (typeof data === "object") {
                for (var key in data) {
                    if (typeof data[key] === 'object' && !(data[key] instanceof Array)) {
                        initConfit(data[key], defaultConfig[key]);
                    } else {
                        defaultConfig[key] = data[key] || defaultConfig[key];
                    }
                }
            }
        }
        initConfit(config, defaultConfig);
        function initContent(content) {
            if (content instanceof Array) {
                for (var i = 0; i < content.length; i++) {
                    for (var key in content[i]) {
                        if (content[i][key]) {
                            eftCircleArray[i][key] = content[i][key];
                        }
                    }
                }
            }
        }
        initContent(content);
        console.log('defaultConfig:')
        console.log(defaultConfig);

        var ctx = document.getElementById(selector);
        ctx.height = defaultConfig['height'];
        ctx.width = defaultConfig['width'];
        context = ctx.getContext('2d');
        var sum = 0;
        function strokeBg() { //左上圆底色
            context.lineWidth = defaultConfig['lineWidth'];
            context.lineCap = "round";
            for (var i = 0; i < content.length; i++) {
                context.beginPath();
                context.strokeStyle = defaultConfig['bgcolor'][i];
                //arc(X轴，Y轴，半径-第几圈圆环宽，起始角度，结束角度)
                context.arc(defaultConfig['centerX'], defaultConfig['centerY'], defaultConfig['radius'] - i * defaultConfig['lineWidth'], 0, Math.PI * 2, false);
                context.stroke();
                context.closePath();
                sum = sum + content[i]['num'];
            }
            //圈内总计数量
            context.beginPath();
            context.fillStyle = defaultConfig.font.color;
            context.font = defaultConfig.font.circle_fontSize + 'pt ' + defaultConfig.font.fontFamily;
            context.textAlign = 'center';
            context.fillText(sum, defaultConfig['centerX'], defaultConfig['centerY'] - defaultConfig.font.circle_fontSize / 3)
            context.closePath();
            //总计
            context.beginPath();
            context.font = defaultConfig.font.fontSize + 'pt ' + defaultConfig.font.fontFamily;
            context.textAlign = 'center';
            context.fillText('总计', defaultConfig['centerX'], defaultConfig['centerY'] + (defaultConfig.font.circle_fontSize - 0))
            context.closePath();
        }
        strokeBg();

        function strokeEft(eftCircleArray) {
            for (var i = 0; i < content.length; i++) {
                // 左上圆环
                var canvasGra = context.createLinearGradient(30, 30, 200, 200);
                canvasGra.addColorStop(0, eftCircleArray[i]['linears'][0]);
                canvasGra.addColorStop(0.3, eftCircleArray[i]['linears'][1]);
                canvasGra.addColorStop(0.6, eftCircleArray[i]['linears'][2]);
                canvasGra.addColorStop(1, eftCircleArray[i]['linears'][3]);
                context.beginPath();
                context.strokeStyle = canvasGra;
                context.arc(defaultConfig['centerX'], defaultConfig['centerY'], defaultConfig['radius'] - i * defaultConfig['lineWidth'], -Math.PI / 2, Math.PI * 2 * eftCircleArray[i]['rate'] - Math.PI / 2, false);
                context.stroke();
                context.closePath();
                //右边说明条
                context.beginPath();
                context.moveTo(defaultConfig['lineToX'], defaultConfig['lineToY'] + defaultConfig['eachDesHeight'] * i);
                context.lineTo(defaultConfig['lineToX'] + defaultConfig['desLineWidth'], defaultConfig['lineToY'] + defaultConfig['eachDesHeight'] * i);
                context.stroke();
                context.closePath();
                //右边说明文字 （包括名字，百分比，人数）
                context.beginPath();
                context.font = defaultConfig.font.fontSize + 'pt ' + defaultConfig.font.fontFamily;
                context.textAlign = 'left';
                context.fillStyle = defaultConfig.font.color;

                context.fillText(eftCircleArray[i]['name'], defaultConfig['desToX'], defaultConfig['desToY'] + defaultConfig['eachDesHeight'] * i + defaultConfig.font.fontSize / 2);

                context.fillText(eftCircleArray[i]['rate'] * 100 + ' %', defaultConfig['percentToX'], defaultConfig['percentToY'] + defaultConfig['eachDesHeight'] * i + defaultConfig.font.fontSize / 2);

                context.fillText(eftCircleArray[i]['num'], defaultConfig['numToX'], defaultConfig['numToY'] + defaultConfig['eachDesHeight'] * i + defaultConfig.font.fontSize / 2);
                context.fillText(defaultConfig['unit'], defaultConfig['unitToX'], defaultConfig['unitToY'] + defaultConfig['eachDesHeight'] * i + defaultConfig.font.fontSize / 2);
                context.closePath();

            }
        }
        strokeEft(eftCircleArray);

    }
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

} 