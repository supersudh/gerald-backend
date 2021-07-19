"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Key value pair to map phone number with OTP...
// Sorry, no time to explore twilio or Plivo :-(
const OTP_HASH = {};
function isValidPhoneNumber(phone = '') {
    const phoneGex = /\d{10}/;
    return phoneGex.test(phone);
}
function default_1(router) {
    router.route('/users/generateOTP')
        .post((req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { phone } = req.body;
            if (!isValidPhoneNumber(phone)) {
                return res.status(400).send({
                    error: 'Invalid Phone number'
                });
            }
            const generatedOTP = Math.random().toString().substr(2, 6);
            OTP_HASH[phone] = generatedOTP;
            console.log(OTP_HASH);
            return res.status(200).send({ status: 'ok', generatedOTP });
        }
        catch (error) {
            console.log('Error in /users/generateOTP');
            console.log(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
    }));
    router.route('/users/validateOTP')
        .post((req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { phone, otp } = req.body;
            if (!isValidPhoneNumber(phone)) {
                return res.status(400).send({
                    error: 'Invalid Phone number'
                });
            }
            if (OTP_HASH[phone] === otp) {
                delete OTP_HASH[phone];
                return res.status(200).send({ status: 'ok' });
            }
            else {
                return res.status(400).send({
                    error: 'Invalid OTP'
                });
            }
        }
        catch (error) {
            console.log('Error in /users/generateOTP');
            console.log(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
    }));
}
exports.default = default_1;
//# sourceMappingURL=generateOTP.js.map