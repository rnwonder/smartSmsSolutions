# Smart sms solutions

[Documentation](https://developer.smartsmssolutions.com/)

## Installation

```bash
 pnpm add smart-sms-solutions
```

```bash
 npm install smart-sms-solutions
```

```bash
 yarn add smart-sms-solutions
```

```bash
 bun add smart-sms-solutions
```

## Usage

```js
import SmartSmsSolutions from "smart-sms-solutions";

const smartSmsSolutions = new SmartSmsSolutions("api_key");

const balance = await smartSmsSolutions.getBalance();
```

## Methods

- Note: For all methods that needs a refId argument, the refId is optional. we generate a random refId for you if you don't provide one with a length of 50 characters.

### getBalance

```js
const balance = await smartSmsSolutions.getBalance();
```

### getDataProductList

```js
const dataProductList = await smartSmsSolutions.getDataProductList(
  "080********",
  "SME"
);
```

- takes two arguments
- `phoneNumber` - The phone number of the user
- `sort` - The sort order of the list of data products. Can be `undefined` or `SME`

### buyInternetData

```js
const buyInternetData = await smartSmsSolutions.buyInternetData({
  phone: "080********",
  productName: "product-name",
  refId: "ref-id",
});
```

### buyAirtime

```js
const buyAirtime = await smartSmsSolutions.buyAirtime({
  phone: "080********",
  amount: 1000,
  refId: "ref-id",
});
```

### voiceOtpRequest

```js
const voiceOtpRequest = await smartSmsSolutions.voiceOtpRequest({
  phone: "080********",
  otp: "123456",
  refId: "ref-id",
  classTitle: "THREE_DIGITS_ONCE",
});
```

- If you want to add a voice otp class you can either use the `classCode` or `classTitle` property. You can't use both at the same time.
- `classTitle` can be `THREE_DIGITS_ONCE`, `THREE_DIGITS_TWICE`, `FOUR_DIGITS_ONCE`, `FOUR_DIGITS_TWICE`, `SIX_DIGITS_ONCE`, `SIX_DIGITS_TWICE`
- `classTitle` inputs the class code for you.
- `classCode` is the code of the voice otp class. e.g. B1DXW4V8YA. Here you have to input the class code yourself.

### voiceOtpDeliveryStatus

```js
const voiceOtpDeliveryStatus = await smartSmsSolutions.voiceOtpDeliveryStatus({
  refId: "ref-id",
  logId: "log-id",
});
```

### sendSmsOtp

```js
const sendSmsOtp = await smartSmsSolutions.sendSmsOtp({
  phone: "080********",
  otp: "123456",
  refId: "ref-id",
  senderId: "sender-id",
  appNameCode: "app-name-code",
  templateCode: "template-code",
});
```

### sendSms

```js
const sendSms = await smartSmsSolutions.sendSms({
  to: "080********",
  message: "message",
  refId: "ref-id",
  senderId: "sender-id",
  dirTimeout: "dir-timeout",
  routing: "routing",
  schedule: "schedule",
  type: "type",
  simServerToken: "sim-server-token",
});
```

- only `to`, `senderId` and `message` are required
- `type` defaults to 0
- `routing` defaults to 3

### submitSenderId

```js
const submitSenderId = await smartSmsSolutions.submitSenderId({
  senderId: "sender-id",
  message: "message",
  address: "address",
  organizationName: "organization-name",
  registrationNumber: "registration-number",
});
```

### getPhoneInfo

```js
const getPhoneInfo = await smartSmsSolutions.getPhoneInfo({
  phone: "080********",
  type: "type",
});
```

##### Always refer to the [documentation](https://developer.smartsmssolutions.com/) for more information.
