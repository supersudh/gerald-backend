import { Request, Response, Router } from "express";

// Key value pair to map phone number with OTP...
// Sorry, no time to explore twilio or Plivo :-(
const OTP_HASH: any = {};

function isValidPhoneNumber(phone: string = '') {
  const phoneGex = /^\d{10}$/;
  return phoneGex.test(phone);
}

export default function (router: Router) {
  router.route('/users/generateOTP')
    .post(async (req: Request, res: Response) => {
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
      } catch (error) {
          console.log('Error in /users/generateOTP');
          console.log(error);
          return res.status(500).send({ error: 'Internal Server Error' });
      }
    });

    router.route('/users/validateOTP')
    .post(async (req: Request, res: Response) => {
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
        } else {
          return res.status(400).send({
            error: 'Invalid OTP'
          });
        }
      } catch (error) {
          console.log('Error in /users/generateOTP');
          console.log(error);
          return res.status(500).send({ error: 'Internal Server Error' });
      }
    });
}
