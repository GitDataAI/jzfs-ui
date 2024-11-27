import {BasicNet} from "../basicNet";
import {UserCaptchaCheck, UserCaptchaEmail} from "../module/email_req";

export class EmailApi extends BasicNet{
    async SendCaptcha(data: UserCaptchaEmail){
        return await this.post('/email/captcha/send',data)
    }
    async CheckCaptcha(data: UserCaptchaCheck){
        return await this.post('/email/captcha/verify',data)
    }
    async SendResetPassword(data: UserCaptchaEmail){
        return await this.post('/email/forget',data)
    }
}