//验证账号
const  loginIdValidator = new FieldValidator('txtLoginId',async function(val){
    if(!val){
        return '请填写账号';
    }
});



//验证密码的规则
const loginPwdValidator = new FieldValidator('txtLoginPwd',function(val){
    if(!val){
        return '请填写密码';
    }
});




const form = $('.user-form');

form.onsubmit = async function(e){
   e.preventDefault();
   const result = await FieldValidator.validate(loginIdValidator,loginPwdValidator);
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
    const resp = await API.login(data);
    console.log(resp)
    if(resp.code === 0){
       alert('登录成功，点击确认，进入聊天界面');
       location.href = './index.html';
    }else{
        loginIdValidator.p.innerText = '账号或密码错误';
        loginPwdValidator.input.value = '';
    }
};