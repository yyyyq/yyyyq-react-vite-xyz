### Promise

#### 1. Promise 是什么
Promise 是 JavaScript 中用于处理异步操作结果的对象。它代表了一个异步操作的最终完成（或失败）及其结果值。

#### 2. 解决什么问题
Promise 解决了回调地狱的问题，使得异步代码更加清晰和易于维护
```js
// 回调地狱
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);

// Promise
doSomething()
  .then(result => doSomethingElse(result))
  .then(newResult => doThirdThing(newResult))
  .then(finalResult => {
    console.log('Got the final result: ' + finalResult);
  })
  .catch(failureCallback);
```
Promise 的作用： 
  - ✔ 让异步变“链式”
  - ✔ 让错误可以统一捕获
  - ✔ 让并发任务更容易管理
  
#### 3. Promise的表现（特征）
1. 三个状态
   * pending: 初始状态，既不是成功，也不是失败状态
   * fulfilled: 意味着操作成功完成
   * rejected: 意味着操作失败
  > 一旦状态改变，就不会再变：pending -> fulfilled，pending -> rejected
2. 链式调用
  ```js
  promise.then((res)=>{}).catch((err)=>{}) // catch为统一的错误处理
  ```
  
  #### 4. Promise 的使用
  ```js
  // 创建一个 Promise 对象
  const promise = new Promise((resolve, reject) => {
    // 异步操作
    if (/* 异步操作成功 */) {
      resolve(value); // 将 Promise 状态改为 fulfilled
    } else {
      reject(error); // 将 Promise 状态改为 rejected
    }
  });

  // 使用 Promise 对象
  promise.then((value) => {
    // 异步操作成功时的处理
  }).catch((error) => {
    // 异步操作失败时的处理
  })
  ```

  - async/await语法糖
  async/await 是 ES2017 引入的一种语法糖，用于简化 Promise 的使用。async 函数返回一个 Promise 对象，await 关键字用于等待 Promise 对象的完成。
  ```js
  async function run() {
    try {
      const res = await delay(1000);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  run();
  ```

  - Promise.all 并发
  all方法接收一个Promise实例数组，返回一个新的Promise实例。当数组中所有Promise实例都变为fulfilled状态时，新的Promise实例才会变为fulfilled状态，此时返回值是一个数组，数组的每个元素对应传入的Promise实例的返回值。如果有一个Promise实例变为rejected状态，新的Promise实例就会变为rejected状态，此时返回值是第一个变为rejected状态的Promise实例的返回值。
  ```js
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });
  Promise.all([promise1, promise2, promise3]).then((values) => {
    console.log(values);
  });
  ```
  
  - Promise.race
  race方法接收一个Promise实例数组，返回一个新的Promise实例。当数组中任意一个Promise实例变为fulfilled状态时，新的Promise实例就会变为fulfilled状态，此时返回值是第一个变为fulfilled状态的Promise实例的返回值。如果有一个Promise实例变为rejected状态，新的Promise实例就会变为rejected状态，此时返回值是第一个变为rejected状态的Promise实例的返回值。
  ```js
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'one');
  });

  const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'two');
  });

  Promise.race([promise1, promise2]).then((value) => {
    console.log(value);
  });
  ```

  - Promise.allSettled
  allSettled方法接收一个Promise实例数组，返回一个新的Promise实例。当数组中所有Promise实例都变为fulfilled状态或rejected状态时，新的Promise实例才会变为fulfilled状态，此时返回值是一个数组，数组的每个元素对应传入的Promise实例的返回值。无论Promise实例是fulfilled状态还是rejected状态，都会被包含在返回值数组中。
  ```js
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });
  Promise.allSettled([promise1, promise2, promise3]).then((results) => {
    console.log(results);
  });

  //[{status: "fulfilled", value: 3}...]
  //[{status: "rejected", reason: "error"}...]
  ```

#### 5. 手写Promise
  1. 链式调用,then
  ```js
  class MyPromise{
    constructor(executor){
      // 定义状态与回调
      this.status = 'pending';
      this.value = undefined;
      this.reason = undefined;
      this.onFulfilledCallbacks = [];
      this.onRejectedCallbacks = [];

      // 定义resolve和reject函数
      const resolve = (value)=>{
        if(this.status === 'pending'){
          this.status = 'fulfilled';
          this.value = value;
          this.onFulfilledCallbacks.forEach(fn=>fn());
        }
      }

      const reject = (reason)=>{
        if(this.status === 'pending'){
          this.status = 'rejected';
          this.reason = reason;
          this.onRejectedCallbacks.forEach(fn=>fn());
        }
      }

      // 执行executor函数，立即同步执行
      try{
        executor(resolve,reject);
      }catch(err){
        reject(err);
      }
    }
    // 链式调用，then方法return 一个新的Promise对象
    then(onFulfilled,onRejected){
      // 返回一个新的Promise对象
      const promise2 = new MyPromise((resolve,reject)=>{
        const fulfilledTask = ()=>{
          queueMicrotask(()=>{
            try {
              const res = onFulfilled(this.value);
              this.resolvePromise(promise2, res, resolve, reject);
            }catch(err){
              reject(err);
            }
          })
        }

        const rejectedTask = ()=>{
          queueMicrotask(()=>{
            try{
              const res = onRejected(this.reason);
              this.resolvePromise(promise2, res, resolve, reject);
            }catch(err){
              reject(err);
            }
          })
        }

        // 如果状态为fulfilled，执行onFulfilled
        if(this.status === 'fulfilled'){
          fulfilledTask()
        }
        // 如果状态为rejected，执行onRejected
        if(this.status === 'rejected'){
          rejectedTask()
        }
        // 如果状态为pending，将回调函数存入数组
        if(this.status === 'pending'){
          this.onFulfilledCallbacks.push(()=>fulfilledTask())
          this.onRejectedCallbacks.push(()=>rejectedTask())
        }        
      })
      return promise2
    }

    resolvePromise(promise2, x, resolve, reject) {
      if (promise2 === x) return reject(new TypeError('Chaining cycle'));
      if (x instanceof MyPromise) {
        x.then(resolve, reject);
      } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        let called = false;
        try {
          const then = x.then;
          if (typeof then === 'function') {
            then.call(
              x,
              y => { if (!called) { called = true; this.resolvePromise(promise2, y, resolve, reject); } },
              r => { if (!called) { called = true; reject(r); } }
            );
          } else {
            resolve(x);
          }
        } catch (e) {
          if (!called) reject(e);
        }
      } else {
        resolve(x);
      }
    }
  }
  
  // 使用
  const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('success');
    })
  })
  promise.then((res)=>{
    console.log(res);
  })
  ```

  2. 错误处理
  ```js
  class MyPromise{
    constructor(executor){
      // 定义状态与回调
     // 同上...

      // 定义resolve和reject函数
      // 同上...
    

      // 执行executor函数，立即同步执行
      try{
        executor(resolve,reject);
      }catch(err){
        reject(err);
      }
    }
    // 链式调用，then方法
    // 同上...

    catch(onRejected){
      return this.then(null,onRejected);
    }

    finally(onFinally){
      return this.then(
        value => MyPromise.resolve(onFinally()).then(() => value),
        reason => MyPromise.resolve(onFinally()).then(() => { throw reason })
      );
    }
  }

  // 使用
  const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('success');
    })
  })
  promise.then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
    })
  ```