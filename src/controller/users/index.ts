import { Router } from 'express';

import generateOTP from './generateOTP';

export default (router: Router) => {
  generateOTP(router);
};
