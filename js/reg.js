//验证账号
const  loginIdValidator = new FieldValidator('txtLoginId',async function(val){
    if(!val){
        return '请填写账号';
    }
    const resp = await API.exists(val);
    if(resp.data){
        //账号已经存在
        return '该账号已存在，请重新选择一个账号名';
    }
});


//验证昵称
const nickNameValidator = new FieldValidator('txtNickname',function(val){
    if(!val){
        return '请填写昵称';
    }
})

//验证密码的规则
const loginPwdValidator = new FieldValidator('txtLoginPwd',function(val){
    if(!val){
        return '请填写密码';
    }
});

//重复输入密码
const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm',function(val){

    if(!val){
        return '请填写确认密码';
    }
    if(val !== loginPwdValidator.input.value){
        return '二次输入密码不一致';
    }

})


const form = $('.user-form');

form.onsubmit = async function(e){
   e.preventDefault();
   const result = await FieldValidator.validate(loginIdValidator,
    nickNameValidator,
    loginPwdValidator,
    loginPwdConfirmValidator);
    if(!result)return;//验证未通过
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    //常规方法
    // const resp = await API.reg(
    //     {
    //         loginId:loginIdValidator.input.value,
    //         loginPwd:loginPwdValidator.input.value,
    //         nickname:nickNameValidator.input.value,
    //     }
    // );
    const resp = await API.reg(data);
    if(resp.code === 0){
        alert('注册成功,点击确定，跳转到登录界面');
        location.href = './login.html';
    }
};