//用户登录和注册的时候，表单项通用的验证。
class FieldValidator{

    /**
     * 
     * @param {string} txtId //文本框的id
     * @param {Function} validatorFunc  验证规则的函数。
     */
    constructor(txtId,validatorFunc){
         this.input = $('#'+txtId);
         this.p = this.input.nextElementSibling;
         this.validatorFunc = validatorFunc;
         this.input.onblur = ()=>{
            this.validate();
         }
    }

    //验证，验证成功返回true， 失败返回false
    async validate(){
        const err = await this.validatorFunc(this.input.value);
        if(err){
            this.p.innerText = err;
            return false;
        }else{
            this.p.innerText = '';
            return true;
        }
    }

    /**
     * 对于传入的验证其进行统一的验证 全部通过就是true 否则就是false
     * @param {FieldValidator[]} validators 
     */
    //静态方法
    static async validate(...validators){
        const proms = validators.map((v)=>v.validate());
        const result = await Promise.all(proms);
        return result.every((r)=>r);
    }
}


