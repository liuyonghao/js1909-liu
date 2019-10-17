//获取元素
var oForm = document.querySelector('form');
var oInput = document.querySelectorAll('input');
var oSpan = document.querySelectorAll('span');
var oyzm = document.querySelector('#yzm');
//用户名称
oInput[0].onfocus = function () {
    oInput[0].value = '';
    oSpan[0].style.color = '#999';
}
oInput[0].onblur = function () {
    var userreg = /^(\w{6,25})$/;
    if (this.value !== '') {
        if (userreg.test(this.value)) {
            oSpan[0].innerHTML = '√';
            oSpan[0].style.color = 'green';
        } else {
            oSpan[0].innerHTML = '用户名称有误';
            oSpan[0].style.color = 'red';
        }
    } else {
        oSpan[0].innerHTML = '用户名称为空';
        oSpan[0].style.color = 'red';
    }
}
//设置密码
oInput[1].onfocus = function () {
    oInput[1].value = '';
    oSpan[1].innerHTML = '请输入一个6-20位的密码';
    oSpan[1].style.color = '#999';
}
oInput[1].oninput = function () {
    if (this.value.length >= 6 && this.value.length <= 20) {
        var regnum = /[0-9]+/g; //数字0-9
        var reguppercase = /[A-Z]+/g; //大写字母A-Z
        var reglowercase = /[a-z]+/g; //小写字母a-z
        var other = /[\W\_]+/g; //其他字符
        var count = 0; //计算种类
        if (regnum.test(this.value)) {
            count++;
        }
        if (reguppercase.test(this.value)) {
            count++;
        }
        if (reglowercase.test(this.value)) {
            count++;
        }
        if (other.test(this.value)) {
            count++;
        }
        //swich语句判断密码强度
        switch (count) {
            case 1:
                oSpan[1].innerHTML = '弱';
                oSpan[1].style.color = 'red';
                break;
            case 2:
            case 3:
                oSpan[1].innerHTML = '中';
                oSpan[1].style.color = 'orange';
                break;
            case 4:
                oSpan[1].innerHTML = '强';
                oSpan[1].style.color = 'green';
                break;
        }
    } else {
        oSpan[1].innerHTML = '密码长度有误';
        oSpan[1].style.color = 'red';
    }
}
oInput[1].onblur = function () {
    if (this.value !== '' && this.value.length >= 6 && this.value.length <= 20) {
        oSpan[1].innerHTML = '√';
        oSpan[1].style.color = 'green';
    } else if (this.value.length < 6) {
        oSpan[1].innerHTML = '密码长度有误';
        oSpan[1].style.color = 'red';
    } else {
        oSpan[1].innerHTML = '密码不能为空';
        oSpan[1].style.color = 'red';
    }
}
//确认密码
oInput[2].onfocus = function () {
    oInput[2].value = '';
    if (this.value === '') {
        oSpan[2].innerHTML = '请输入上面设置的密码';
    }
};
oInput[2].onblur = function () {
    if (this.value === oInput[1].value) {
        if (this.value !== '') {
            oSpan[2].innerHTML = '√';
            oSpan[2].style.cssText = 'color:green;';
        } else {
            oSpan[2].innerHTML = '两次密码不一样，请确认输入';
            oSpan[2].style.cssText = 'color:red;';
            oSpan[2].innerHTML = '确认密码不得为空';
        }
    }
}
//手机号码
oInput[3].onfocus = function () {
    oInput[3].value = '';
    oSpan[3].innerHTML = '请输入一个正确的手机号码';
    oSpan[3].style.color = '#999';
};
oInput[3].onblur = function () {
    var reg = /^1[3578]\d{9}$/; //手机号码验证规则
    if (this.value !== '') { //验证手机号码不能为空
        if (reg.test(this.value)) { //检测手机号码是否合法
            oSpan[3].innerHTML = '√';
            oSpan[3].style.color = 'green';
        } else {
            oSpan[3].innerHTML = '手机号码格式不正确';
            oSpan[3].style.color = 'red';
        }
    } else {
        oSpan[3].innerHTML = '手机号码不能为空';
        oSpan[3].style.color = 'red';
    }
}
//验证码
oInput[4].onfocus = function () {
    oInput[4].value = '';
    oSpan[4].innerHTML = '请输入正确的验证码';
    oSpan[4].style.color = '#999';
}
//随机产生四字验证码
function yzm() {
    var num = '';
    for (var i = 1; i <= 4; i++) {
        num += parseInt(Math.random() * 10);
    }
    return num;
}
oInput[4].innerHTML = yzm();
//验证验证码
oInput[4].onblur = function () {
    var reg = /^[0-9]{4}$/;
    if (this.value !== '') { //验证码不能为空
        if (reg.test(this.value)) { //检测验证码是否合法
            oSpan[4].innerHTML = '√';
            oSpan[4].style.color = 'green';
        } else {
            oSpan[4].innerHTML = '验证码格式不正确';
            oSpan[4].style.color = 'red';
        }
    } else {
        oSpan[4].innerHTML = '验证码不能为空';
        oSpan[4].style.color = 'red';
    }
}
//提交表单-事件类型是onsubmit
oForm.onsubmit = function () {
    if (oInput[0].value === '') {
        oSpan[0].innerHTML = '用户名称不能为空';
        oSpan[0].style.color = 'red';
    }
    if (oInput[1].value === '') {
        oSpan[1].innerHTML = '登录密码为空';
        oSpan[1].style.color = 'red';
    }
    if (oInput[2].value === '') {
        oSpan[2].innerHTML = '确认密码不能为空';
        oSpan[2].style.color = 'red';
    }
    if (oInput[3].value === '') {
        oSpan[3].innerHTML = '手机号码不能为空';
        oSpan[3].style.color = 'red';
    }
    if (oInput[4].value === '') {
        oSpan[4].innerHTML = '验证码不能为空';
        oSpan[4].style.color = 'red';
    }
    return false;
};

