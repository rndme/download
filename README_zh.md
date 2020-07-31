# download

[![NPM version][npm-image]][npm-url] 
[![Size][size-image]][size-url] 
[![License][license-image]][license-url] 
[![CDNJS](https://img.shields.io/cdnjs/v/downloadjs.svg)](https://cdnjs.com/libraries/downloadjs)

#  download() 函数的中文文档
`英语水平有限，编程基础也比较基础，欢迎大家助力`

## 简介
---------
download() 是一个 JavaScript 函数，它的功能是用来从浏览器下载文件

它可以自定义下载下来的文件名，并自动将下载的文件放在浏览器的默认下载目录里。输入数据可以是 URL（下载网址），字符串，[Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)，或数组类型数据，或通过 base64 编码以 [DataURLs](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/data_URIs) 表示的数据，或 URL 编码后的字符串， 无论输入什么样的格式，download() 函数都将用您自定义的文件名和指定的 Mime 文件类型下载文件，它与 HTTP 应答中指定了 [Content-Disposition](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Disposition) 响应头为下载文件是一样的。

## 获取和使用
---------

### 使用 NPM/Bower 
`npm install downloadjs`  <br />
`bower install downloadjs`

`require("downloadjs")(data, strFileName, strMimeType);`

### 通过 `<script></script>` 标签引入
```
<!-- 你的HTML页面代码大概像这样 -->
<script src="./js/download.min.js"></script>
```
```
// 你的 js 文件中的代码

//URL（下载网址），字符串，Blob，或数组类型数据，或通过 base64 编码以 DataURLs 表示的数据，或 URL 编码后的字符串
let data = ""

//您下载后将以什么名字保存，不填默认名字为download
let strFileName = ""

//文件的 Mime 类型
let strMimeType = ""

download(data, strFileName, strMimeType);

```
### 通过 AMD 模式引入
> [AMD 与 CMD 模式介绍](https://blog.csdn.net/qqhluckyi/article/details/83214540)

    require(['path/to/file'], function(download) {
        download(data, strFileName, strMimeType);
    });

### 参数说明
|参数|是否必选|说明|
|---|---|---|
|data|是|URL（下载网址），字符串，Blob，或数组类型数据，或通过 base64 编码以 DataURLs 表示的数据，或 URL 编码后的字符串|
|strFileName|否|指定下载后保存时文件的名字，如果发现没有按你的名字来，是不是浏览器比较旧，老浏览器不支持
|strMimeType|否|待下载的文件的 Mime 文件类型|
|dataType|否|可用值为['path', 'blob', 'dataUrl', 'string']|


## 我的示例（chatterzhao 编辑）
```
// 本段代码第一行的 downloadFile() 是我自己的函数（我的数据源是 URL）
//本段代码倒数第 8 行 的 download() 是本库的函数
function downloadFile(downloadFileFullURL, downloadFileName, fileMimeType) {
    var xmlHttp = null;
    if (window.ActiveXObject) {
        // IE6, IE5 浏览器执行代码
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlHttp = new XMLHttpRequest();
    }

    xmlHttp.open("GET", downloadFileFullURL, true);

    xmlHttp.responseType = 'blob';

    xmlHttp.onload = function (e) {

        // 申明 downloadRes 接受 download() 函数的返回
        let downloadRes = download(xmlHttp.response, downloadFileName, fileMimeType);
        console.log('downloadRes：',downloadRes)
        //download() 函数返回代码是：return true，我去改为：return strFileName
        //这样返回就拿到了下载成功的文件名，这样就可以对下载状态进行自己写状态交互
        //默认 download()，下载没有交互，比如文件比较大，感觉浏览器静悄悄的，体验差
    };
    xmlHttp.send();
}
```

## 用例
---------
>以下链接我这里打开，chrome 浏览器提示有安全隐患，大家自己判断是否打开

### Plain Text
 text string  -  [示例：http://pagedemos.com/hw24em95rsfq/output/](http://pagedemos.com/hw24em95rsfq/output/)
```
    download("hello world", "dlText.txt", "text/plain");
```

 text dataURL  -  [示例：http://pagedemos.com/r9ywm98s6b29/output/](http://pagedemos.com/r9ywm98s6b29/output/)
 ```
    download("data:text/plain,hello%20world", "dlDataUrlText.txt", "text/plain");
```

 text blob  -  [示例：http://pagedemos.com/ckcah2vp8kza/output/](http://pagedemos.com/ckcah2vp8kza/output/)
```
    download(new Blob(["hello world"]), "dlTextBlob.txt", "text/plain");
```

 text url -  [示例：http://pagedemos.com/pz6hkyqutjtw/output/](http://pagedemos.com/pz6hkyqutjtw/output/)
 ```
    download("/robots.txt");
```

 text UInt8 Array -  [示例：http://pagedemos.com/zuyk46wbkktq/output/](http://pagedemos.com/zuyk46wbkktq/output/)
```
    var str= "hello world",	arr= new Uint8Array(str.length);
    str.split("").forEach(function(a,b){
   	  arr[b]=a.charCodeAt();
    });

    download( arr, "textUInt8Array.txt", "text/plain" );
```

### HTML
 html string -  [示例：http://pagedemos.com/k7rwq7msu3eb/output/](http://pagedemos.com/k7rwq7msu3eb/output/)
```
    download(document.documentElement.outerHTML, "dlHTML.html", "text/html");
```

 html Blob -  [示例：http://pagedemos.com/bxehm2fdf3g4/output/](http://pagedemos.com/bxehm2fdf3g4/output/)
```
    download(new Blob(["hello world".bold()]), "dlHtmlBlob.html", "text/html");
```

 ajax callback -  [示例：http://pagedemos.com/arr2ym74aw8t/output/](http://pagedemos.com/arr2ym74aw8t/output/)
>(注意：回调模式不适用 vanilla ajax 和 二进制文件)
```   
    $.ajax({
    		url: "/download.html",
    		success: download.bind(true, "text/html", "dlAjaxCallback.html")
    });
```

### 二进制文件
 image from URL  -  [示例：http://pagedemos.com/yvvmxbjrwq7u/output/](http://pagedemos.com/yvvmxbjrwq7u/output/)
```
    download("/diff6.png");
```

 通过 Ajax 下载图片，并指定下载后的名字 -  [示例：http://pagedemos.com/v2848zfgwrju/output/](http://pagedemos.com/v2848zfgwrju/output/)
```
	var x=new XMLHttpRequest();
	x.open( "GET", "/diff6.png" , true);
	x.responseType="blob";
	x.onload= function(e){download(e.target.response, "awesomesauce.png", "image/png");};
	x.send();
```


## 兼容性
---------
download.js可与各种设备和浏览器一起使用。

您可以期望它适用于绝大多数用户，但有一些常识性限制：

* 没有文件系统的设备，例如 iPhone，iPad，Wii 等。无处可保存文件，支持不了。
* 内置浏览器的 Android 支持始于4.2，但是 android 2.3+ 上的 chrome 36+ 和 firefox 20+ 都可以正常工作。
* 不支持Blob的设备将无法下载 Blob 或 TypedArrays
* 传统设备（不提供[下载]）支持只能下载数百KB的数据，并且不能为文件指定自定义名称
* 没有 window.URL 支持的设备只能下载几兆字节的数据，超过就不行了
* 不支持 IE 9 及更低版本


## 常被问到的问题
---------

 * `能否告诉一个下载是完成了还是没有` 不可以.
 > --不过我发现 download() 返回，好像是下载完才会返回 ( `chatterzhao 编辑` )
 * `如何设置临时下载链接的样式？`  `.download-js-link` 是定义样式类的地方，大概在 106 行.
 * `为什么 Safari 浏览器不正常?` 我也不知道，但是欢迎提出改进的 `pull requests`
 * `为什么我的二进制文件损坏了？` Likely: an incorrect MIME or using jQuery ajax, which has no bin support.
 * `下载文件大小限制多少？` 本代码是没有什么限制，要看你数据源的其他限制,我通常在一台 thinkpad 上下载 1G 的文件也没问题


## 变更日志 (v4.1)
---------
* 2008 :: v1 创建了一个支持 FireFox 和 Chrome 来下载字符串到本地的功能，为隐藏式下载模式（不是展示在网页上，而是以文件形式下载），可选的 Mime 文件类型，不自定义下载后保存的文件名
* 2012 :: v2 新增，没有指定下载文件名时，传入 `download` 作为默认文件名，IE（10+）支持 msSaveBlob（），支持更快以及更大的下载dataURLs 类型数据
* 2014 :: v3 新增，新增可传入的数据类型 dataURL 和 Blob，, bind-toggle arity, and legacy dataURL fallback was improved with force-download mime and base64 support
* 2015 :: v4 转换为浏览器更友好的 [AMD模式](https://blog.csdn.net/qqhluckyi/article/details/83214540) / commonJS模块
* 2015 :: 4.1 新增，只传入 URL 进行下载（仅限同域或[跨域资源共享(CORS)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)）
* 2016 :: 4.2 添加语义变量名、支持更长的（超过2MB）dataURL，并在默认情况下隐藏临时链接
* 2017 :: 新增，新增了对空dataURLs的支持
* 20XX :: ??? 考虑到Zip，Tar和其他多文件输出，Blob.prototype.download选项等，敬请关注。


[MIT license]: http://opensource.org/licenses/MIT
[npm-image]: https://badge.fury.io/js/downloadjs.svg
[npm-url]: https://npmjs.org/package/downloadjs
[license-image]: https://img.shields.io/badge/license-MIT-green.svg
[license-url]: http://opensource.org/licenses/MIT
[size-image]: http://img.badgesize.io/rndme/download/master/download.min.js.svg?compression=gzip&label=gzip%20size
[size-url]: https://unpkg.com/downloadjs
