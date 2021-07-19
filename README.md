# Validator Backend

### Local development

```
npm i
npm run start
```

### Notes

```
1. /users/generateOTP generates OTP using random number logic and stores mapping using a local variable. This can be handled at a production level using third-party service like plivo or twilio.
2. /users/validateOTP validates the OTP.
```