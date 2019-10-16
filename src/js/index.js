//轮播效果
//1.获取元素对象。
var banner = document.querySelector('.banner-pic'); //获取最大的盒子banner
var piclist = document.querySelectorAll('.banner-pic .banner-ul li'); //获取3张图片
var btnlist = document.querySelectorAll('.banner-pic ol li'); //获取3个按钮
var arrowLeft = document.querySelector('#left'); //左右切换箭头
var arrowRight = document.querySelector('#right');
var currentindex = 0; //全局
var timer = null; //定时器的返回值
//2.给3个按钮添加鼠标经过事件(onmouseover)
for (var i = 0; i < btnlist.length; i++) { //i:0,1,2
    //4.每一个按钮添加自定义的属性。
    btnlist[i].index = i;
    btnlist[i].onmouseover = function () { //i:0,1,2
        currentindex = this.index;
        tabswitch();
    }
}
//5.鼠标移入banner显示左右箭头+鼠标移入关闭定时器，移开打开
banner.onmouseover = function () {
    arrowLeft.style.display = 'block';
    arrowRight.style.display = 'block';
    clearInterval(timer);
};
banner.onmouseout = function () {
    arrowLeft.style.display = 'none';
    arrowRight.style.display = 'none';
    //移开继续打开定时器
    timer = setInterval(function () {
        arrowRight.onclick();
    }, 2000);
};
//6.arrowRight添加点击事件。
arrowRight.onclick = function () {
    currentindex++;
    if (currentindex > btnlist.length - 1) {
        currentindex = 0;
    }
    tabswitch();
};
arrowLeft.onclick = function () {
    currentindex--;
    if (currentindex < 0) {
        currentindex = btnlist.length - 1;
    }
    tabswitch();
};
//7.封装切换过程
function tabswitch() {
    for (var j = 0; j < btnlist.length; j++) {
        btnlist[j].className = ''; //去掉所有按钮上面的类名。
        piclist[j].style.display = 'none'; //隐藏所有的图片
    }
    //this.index:当前点击的按钮的索引位置。
    btnlist[currentindex].className = 'active'; //className:类名  class被js的面向对象所引用。
    piclist[currentindex].style.display = 'block'; //和当前按钮对应得图片显示出来。
    document.title = currentindex;
}
//8.定时器自动轮播
//每隔两秒自动触发右键。
timer = setInterval(function () {
    arrowRight.onclick();
    // currentindex++;
    // if (currentindex > btnlist.length - 1) {
    //     currentindex = 0;
    // }
    // tabswitch();
}, 2000);






//渲染数据列表
;
(function () {
    const list = document.querySelector('.list');
    const phpurl = 'http://10.31.155.60/h5-1909/woniushangcheng/php/list.php';
    //1.渲染商品列表
    $ajax({
        url: phpurl,
        dataType: 'json'
    }).then(function (listdata) {
        let strhtml = '<ul>';
        for (let value of listdata) {
            strhtml += `
            <li>
                <a href="../html/details.html?sid=${value.sid}" target="_blank" class="prop-zb-product" >
                    <div class = "prop-zb-product-title" >${value.titile}</div>
                    <div class = "prop-zb-product-price" > ${value.price}元</div> 
                    <img src="${value.url}">
                </a>
            </li>
            `;
        }
        strhtml += '</ul>';
        list.innerHTML = strhtml;
    });
})();


// 懒加载图片
var num = document.getElementsByTagName('img').length;
var img = document.getElementsByTagName("img");
// 存储图片加载到的位置，避免每次都从第一张图片开始遍历
var n = 0;
// 页面载入完毕加载可视区域内的图片
lazyLoad();
window.onscroll = lazyLoad;
// 监听页面滚动事件
function lazyLoad() {
    // 可见区域高度
    var seeHeight = document.documentElement.clientHeight;
    // 滚动条距离顶部高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    for (var i = n; i < num; i++) {
        if (img[i].offsetTop < seeHeight + scrollTop) {
            if (img[i].getAttribute("src") == "default.jpg") {
                img[i].src = img[i].getAttribute("data-src");
            }
            n = i + 1;
        }
    }
}


// tab切换
var aBtn = document.querySelectorAll('.button');
var adiv = document.querySelectorAll('.game-props-products');
for (var i = 0; i < aBtn.length; i++) { //i:0,1
    //通过循环设置自定义索引(自定义属性)
    aBtn[i].index = i;
    //for循环里面有事件或者定时器都无法使用循环的值。i是全局的   for循环和事件关系。
    aBtn[i].onclick = function () {
        //当前的按钮添加类，其他的按钮去掉类。
        for (var i = 0; i < aBtn.length; i++) {
            aBtn[i].className = '';
            adiv[i].className = ''; 
        }
        //this:当前操作的按钮。
        this.className = 'active';

        //如何获取当前按钮的索引。
        //this.index
        //当前的内容块对应得显示。其他的内容块依然消失。
        //当前按钮的索引和内容的索引匹配的。
        adiv[this.index].className = 'show';
    }
}



//楼梯效果
new louti().init();