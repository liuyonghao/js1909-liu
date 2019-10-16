// 购物车列表的拼接
!function(){
    const list=document.querySelector('.item-list');
    const phpurl = 'http://10.31.155.60/h5-1909/woniushangcheng/php/';
    //1.封装函数实现商品列表的拼接。
    function goodslist(sid,num){//sid:商品的编号，num:商品的数量
        $ajax({
            url: phpurl + 'list.php',
            dataType:'json'
        }).then(function(datalist){
            // console.log(datalist);
            for(let i=0;i<datalist.length;i++){
                if(datalist[i].sid===sid){
                    let strhtml='';
                    strhtml+=` 
                        <div class="goods-item goods-item-sele" style="display: block;">
                            <div class="goods-info">
                                <div class="cell b-checkbox">
                                    <div class="cart-checkbox">
                                        <input type="checkbox" checked="" name="" id="" value="" />
                                        <span class="line-circle"></span>
                                    </div>
                                </div>
                                <div class="cell b-goods">
                                    <div class="goods-name">
                                        <div class="goods-pic">
                                            <a href=""><img src="${datalist[i].url}" alt="" /></a>
                                        </div>
                                        <div class="goods-msg">
                                            <div class="goods-d-info">
                                                <a href="">${datalist[i].titile}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="cell b-props">
                                    <div class="prop-text"></div>
                                </div>
                                <div class="cell b-price">
                                    <strong>${datalist[i].price}</strong>
                                </div>
                                <div class="cell b-quantity">
                                    <div class="quantity-form">
                                        <a class="quantity-down" href="javascript:void(0)">-</a>
                                        <input type="text" value="${num}" />
                                        <a class="quantity-add" href="javascript:void(0)">+</a>
                                    </div>
                                </div>
                                <div class="cell b-sum">
                                    <strong>${parseInt(datalist[i].price)*num}</strong>
                                </div>
                                <div class="cell b-action">
                                    <a href="javascript:void(0)">删除</a>
                                </div>
                            </div>
                        </div>
                    `;
                    list.innerHTML+=strhtml;
                }
            }
        });  
    }
    //2.获取对应的cookie转换成数组。
    if(getcookie('cookiesid') && getcookie('cookienum')){       
        let arrsid=getcookie('cookiesid').split(',');
        let arrnum=getcookie('cookienum').split(',');
        for(let i=0;i<arrsid.length;i++){
            goodslist(arrsid[i],arrnum[i]);
        }
    }
}();

 //全选操作


