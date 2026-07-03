### vue-1
#### computed vs watch
- computed: 依赖缓存，只有依赖发生变化时才会重新计算
- watch: 依赖变化时立即执行，可以执行异步操作
- computed和watch都可以监听数据的变化，但是computed更适合用于计算属性，watch更适合用于监听数据的变化并执行异步操作
- computed会缓存计算结果，只有在依赖发生变化时才会重新计算。
- watch会立即执行，可以执行异步操作，但是不会缓存计算结果。
- computed: 数据转换，处理； watch：执行副作用（api请求，dom操作），异步操作

#### ref vs reactive
- ref: 用于创建一个响应式的数据对象，可以用于基本类型和引用类型。
- reactive: 用于创建一个响应式的数据对象，只能用于引用类型。
- ref: 可以用于基本类型和引用类型，但是基本类型的数据在修改时需要使用.value来获取和修改。reactive: 只能用于引用类型，引用类型的数据在修改时不需要使用.value来获取和修改。
- ref: 底层是使用Object.defineProperty来实现的，reactive: 底层是使用Proxy来实现的。
- reactive：可以直接访问和使用，不需要.value, 缺点是不能解构，会丢失响应式。数组整体替换会丢失响应式

#### watchEffect vs watch
- watchEffect: 监听响应式数据的变化，并在变化时执行回调函数。
- watch: 监听响应式数据的变化，并在变化时执行回调函数，可以指定监听的属性。
- watchEffect: 自动收集依赖，不需要指定监听的属性，它会自动监听所有响应式数据的变化。
- watch: 需要指定监听的属性，可以监听多个属性。

#### nextTick
nextTick是vue提供的一个异步工具函数，用于在下一个DOM更新周期之后执行回调函数。
vue实现nextTick是通过微任务机制来实现的，它会将回调函数添加到微任务队列中，然后在下一个DOM更新周期之后执行回调函数。