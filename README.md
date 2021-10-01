# Seatbelt - An async function wrapper

### Description:

The seatbelt wrapper returns an array that contains an error as the first element and the resolved data as the second. The return result can then be destructured for a cleaner look without using a try/catch

---


```javascript
// Usage:
// fn can be a promise or non-promise
await seatbelt(fn); // [err, data]
await seatbelt(fn, errorHandler); // data ( if successful )
```

```javascript
// import
const seatbelt = require('@jamarv4/seatbelt');

// If the function returns successfully, then the first element will be null (error), and the second element will contain the data. -> [null, {user}]
const [error, user] = await seatbelt(fetchUser);



// If the function fails, then the first element will contain error and second will be null -> [Error:..., null]
const [err] = await seatbelt(badFunction);

if (err) {
  // handle error manually
}



// You can also pass in an error handler. By doing this, the seatbelt will not return an array. Instead the resolved value is returned and if an exception occurs then the error handler will be called.

// Example: If using express, you can pass the 'next' function for a clean exection flow
async function expressControllerFn(req, res, next) {
  const user = await seatbelt(fetchUser, next);

  // do something with user if successful....
}

```
