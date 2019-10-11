  //1.获取元素对象。
  var banner = document.querySelector('.banner-pic'); //获取最大的盒子banner
  var piclist = document.querySelectorAll('.banner-pic .banner-ul li'); //获取5张图片
  var btnlist = document.querySelectorAll('.banner-pic ol li'); //获取3个按钮
  var arrowLeft = document.querySelector('#left'); //左右切换箭头
  var arrowRight = document.querySelector('#right');
  var currentindex = 0; //全局
  var timer = null; //定时器的返回值

  //2.给5个按钮添加鼠标经过事件(onmouseover)
  for (var i = 0; i < btnlist.length; i++) { //i:0,1,2
      //4.每一个按钮添加自定义的属性。
      btnlist[i].index = i;
      btnlist[i].onmouseover = function () { //i:0,1,2
          currentindex = this.index;
          //测试事件里面i的值。
          //alert(i);//5  循环内部有事件，事件里面的循环的值是循环的最后一次值。
          //this:当前操作的按钮。
          //3.给当前的按钮添加类，其他的按钮去掉类。
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

  //   $(document).scroll(function () {
  //       if ($(document).scrollTop() >= 500) {
  //           $(".sidebar").fadeIn(500);
  //           var i = Math.floor(($(document).scrollTop() - 500) / 700);
  //           $("ul li").eq(i).children("span").addClass("active");
  //           $("ul li").eq(i).siblings().children("span").removeClass("active")
  //       } else {
  //           $(".sidebar").fadeOut(333);
  //       }
  //   })


  //   $("ul li").not(".last").click(function () {
  //       $("body,html").animate({
  //           "scrollTop": $(this).index() * 700 + 500
  //       }, 666)
  //   })

  //   $(".last").click(function () {
  //       $("body").animate({
  //           "scrollTop": 0
  //       }, 500);
  //   })

  //   var flag = true; //控制 当点击楼层号时，禁止滚动条的代码执行   值为true时，可以执行滚动条代码
  //   //  根据楼层号 控制滚走的距离  
  //   // 1、除了top的楼梯号，为每一个楼梯号添加一个click，控制楼梯滚走的距离（距离：当前楼层的offset().top ）
  //   $(".sidebar li:not(:last)").click(function () {
  //       flag = false;
  //       //当前点击的楼号红色的 其余黑色的
  //       $(this).find("span")
  //           .addClass("active")
  //           .end()
  //           .siblings()
  //           .find("span")
  //           .removeClass("active");
  //       //获取当前楼号对应楼层的 top值
  //       var sTop = $(".Louti").eq($(this).index()).offset().top;

  //       //将页面滚走的距离设置为  sTop  
  //       $("body,html").animate({
  //           "scrollTop": sTop
  //       }, 1000, function () {
  //           flag = true;
  //       });
  //   })
  //   //2、点击top   回到顶部
  //   $(".sidebar li:last").click(function () {
  //       $("body,html").animate({
  //           "scrollTop": 0
  //       }, 1000);
  //       $(".sidebar li span").removeClass("active");
  //   })

  //   //3、 滚动条滚动 --  找到当前楼层的索引    控制楼层号
  //   $(window).scroll(function () {
  //       //如果flag  为true   可以执行滚动条的代码
  //       if (flag) {

  //           //获取页面滚走的距离
  //           var sTop = $(document).scrollTop();
  //           //filter  返回满足条件的那个对象 
  //           //找到满足某个条件的楼层对象    
  //           var $floor = $(".Louti").filter(function (index, ele) {
  //               return Math.abs($(this).offset().top - sTop) < $(this).height() / 2;
  //           })

  //           //根据楼层的索引 设置楼梯号的 样式
  //           $(".sidebar li").eq($floor.index())
  //               .find("span")
  //               .addClass("active")
  //               .end()
  //               .siblings()
  //               .find("span")
  //               .removeClass("active");
  //       }
  //   })

  (function () {
          let $loutiNav = $('#loutinav'); //楼梯盒子
          let $loutiNavLi = $('#loutinav li'); //每一层的楼梯
          //1.楼梯出现与隐藏
          $(window).on('scroll', function () {
              let $topValue = $(this).scrollTop(); //变化的滚动条高度
              if ($topValue >= 800) {
                  $loutiNav.show();
              } else {
                  $loutiNav.hide();
              };
              //4.触发滚动条 楼层对应的楼梯改变
              $('#main .container').each(function (index, element) {
                  let $loucengTop = $(this).offset().top + $(this).height() / 2; //top加上自身高度一半的时候就变成下一层楼梯
                  if ($loucengTop > $topValue) {
                      $loutiNavLi.eq(index).addClass('active').siblings().removeClass('active');
                      return false //跟break一样
                  }
              })
          })