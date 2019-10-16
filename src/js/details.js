;
(function () {
    let sid = location.search.substring(1).split('=')[1];
    const smallpic = document.querySelector('#smallpic');
    const spic = document.querySelector('#spic');
    const bpic = document.querySelector('#bpic');
    const loadtitle = document.querySelector('.loadtitle');
    const loadpcp = document.querySelector('.loadpcp');
    const sf = document.querySelector('#sf');
    const bf = document.querySelector('#bf');
    const wrap = document.querySelector('.wrap');
    const cartbtn = document.querySelector('.p-btn a');
    const goodsnum = document.querySelector('#count');
    const phpurl = 'http://10.31.155.60/h5-1909/woniushangcheng/php/'
    let picli = null;
    //1.将sid传给后端，后端返回对应的数据。
    $ajax({
        url: phpurl + 'details.php',
        data: {
            id: sid
        },
        dataType: 'json'
    }).then(function (objdata) {
        smallpic.src = objdata.url;
        bpic.src = objdata.url;
        loadtitle.innerHTML = objdata.titile;
        loadpcp.innerHTML = objdata.price;
    });
    //放大镜效果
    spic.onmouseover = function () {
        sf.style.visibility = 'visible';
        bf.style.visibility = 'visible';
        //计算小放的尺寸
        sf.style.width = spic.offsetWidth * bf.offsetWidth / bpic.offsetWidth + 'px';
        sf.style.height = spic.offsetHeight * bf.offsetHeight / bpic.offsetHeight + 'px';
        //求比例
        let bili = bpic.offsetWidth / spic.offsetWidth;
        this.onmousemove = function (ev) {
            var ev = ev || window.event;
            let l = ev.clientX - wrap.offsetLeft - sf.offsetWidth / 2;
            let t = ev.clientY - wrap.offsetTop - sf.offsetHeight / 2;
            if (l <= 0) {
                l = 0;
            } else if (l >= spic.offsetWidth - sf.offsetWidth) {
                l = spic.offsetWidth - sf.offsetWidth - 2;
            }

            if (t <= 0) {
                t = 0;
            } else if (t >= spic.offsetHeight - sf.offsetHeight) {
                t = spic.offsetHeight - sf.offsetHeight - 2;
            }
            sf.style.left = l + 'px';
            sf.style.top = t + 'px';

            bpic.style.left = -bili * l + 'px';
            bpic.style.top = -bili * t + 'px';
        }
    };

    spic.onmouseout = function () {
        sf.style.visibility = 'hidden';
        bf.style.visibility = 'hidden';
    };
    let sidarr = []; //存放sid 
    let numarr = []; //存放数量 
    if (getcookie('cookiesid') && getcookie('cookienum')) {
        sidarr = getcookie('cookiesid').split(',');
        numarr = getcookie('cookienum').split(',');
    }

    //第一次加入购物车，创建商品列表，第二次只需要数量累加,提前获取cookie来验证。
    //点击加入购物车按钮，将当前页面商品的sid存放到sidarr数组中，一起存入cookie
    cartbtn.onclick = function () {
        alert('商品添加成功');
        //当前取出的cookie里面存放sid的数组
        if (sidarr.indexOf(sid) !== -1) { //第二次只需要数量累加
            //获取当前sid对应的数量，取出数量，和当前的新的数量进行累加
            //sidarr.indexOf(sid)//当前的sid在存入cookie数组的索引位置
            let index=sidarr.indexOf(sid)
            numarr[index] = parseInt(numarr[index])+ parseInt(goodsnum.value);
            addcookie('cookienum', numarr.toString(), 10);
        } else { //第一次加入购物车，创建商品列表
            sidarr.push(sid);
            addcookie('cookiesid', sidarr.toString(), 10);
            numarr.push(goodsnum.value);
            addcookie('cookienum', numarr.toString(), 10);
        }
    }


})();   