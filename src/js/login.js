;(function(){
    const username=document.querySelector('#username');
    const password=document.querySelector('#password');
    const btnSubmit=document.querySelector('#btnSubmit');

    btnSubmit.onclick=function(){
        let ajax = new XMLHttpRequest();
        ajax.open('post', 'http://10.31.155.60/h5-1909/woniushangcheng/php/login.php', true);
        ajax.setRequestHeader('content-type','application/x-www-form-urlencoded');
        ajax.send(`username=${username.value}&password=${password.value}`);
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
               console.log(ajax.responseText);
               if(ajax.responseText){//登录成功
                    location.href='index.html';
                    //存储用户信息
                    localStorage.setItem('xingming',username.value);
               }else{
                   alert('用户名或者密码错误');
               }
            }
        }
    };
})();