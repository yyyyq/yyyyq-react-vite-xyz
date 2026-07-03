### URL到页面的过程

> 总体：URL → 网络请求 → HTML解析 → DOM树 → CSS解析 → CSSOM树 → 渲染树 → 布局 → 绘制

1. URL → 网络请求
    - DNS解析：将域名解析成IP地址
    - TCP连接：建立TCP连接
    - HTTP请求：发送HTTP请求
2. HTML解析
    - 解析HTML，构建DOM树
    - 解析CSS，构建CSSOM树
3. DOM树和CSSOM树合并成渲染树
    - 渲染树包含了所有需要显示的节点和它们的样式信息
4. 布局
    - 计算每个节点的位置和大小
5. 绘制
6. 重绘和回流
    - 重绘：当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予元素并重新绘制它，这个过程称为重绘。
    - 回流：当渲染树的布局（元素的尺寸、位置、隐藏/显示等）发生改变时，浏览器需要重新计算元素的位置和大小，然后重新绘制页面，这个过程称为回流（或重排）。


#### 重绘和回流
<font style='color: red'>减少重绘和回流的方法：</font>
1. 避免频繁的操作样式，最好将样式集中起来修改
2. 避免频繁的操作DOM，可以使用DocumentFragment创建一个文档片段，在文档片段上进行操作，最后一次性添加到DOM中
3. 避免频繁读取offsetWidth、scrollTop等属性，因为这些属性会触发回流
优化点：尽量使用重绘而不是回流，因为回流的开销更大。transform和opacity可以触发重绘，而width、height、margin、padding等会触发回流。