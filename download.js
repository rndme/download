//download.js v4.0, by dandavis; 2008-2015. [CCBY2] see http://danml.com/download.html for tests/usage
// v1 landed a FF+Chrome compat way of downloading strings to local un-named files, upgraded to use a hidden frame and optional mime
// v2 added named files via a[download], msSaveBlob, IE (10+) support, and window.URL support for larger+faster saves than dataURLs
// v3 added dataURL and Blob Input, bind-toggle arity, and legacy dataURL fallback was improved with force-download mime and base64 support. 3.1 improved safari handling.
// v4 adds AMD/UMD, commonJS, and plain browser support
// https://github.com/rndme/download

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		root.download = factory();
  }
}(this, function () {

	return function download(data, strFileName, strMimeType, withA, withIFrame) {

		var self = window, // this script is only for browsers anyway...
			u = "application/octet-stream", // this default mime also triggers iframe downloads
			m = strMimeType || u,
			x = data,
			D = document,
			a = withA || D.createElement("a"),
			z = function(b){return String(b);},
			B = (self.Blob || self.MozBlob || self.WebKitBlob || z);
			B=B.call ? B.bind(self) : Blob ;
			var fn = strFileName || "download",
			blob,
			fr;

		if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
			x=[x, m];
			m=x[0];
			x=x[1];
		}




		//go ahead and download dataURLs right away
		if(String(x).match(/^data\:[\w+\-]+\/[\w+\-]+[,;]/)){
			return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
				navigator.msSaveBlob(d2b(x), fn) :
				saver(x) ; // everyone else can save dataURLs un-processed
		}//end if dataURL passed?

		blob = x instanceof B ?
			x :
			new B([x], {type: m}) ;


		function d2b(u) {
			var p= u.split(/[:;,]/),
			t= p[1],
			dec= p[2] == "base64" ? atob : decodeURIComponent,
			bin= dec(p.pop()),
			mx= bin.length,
			i= 0,
			uia= new Uint8Array(mx);

			for(i;i<mx;++i) uia[i]= bin.charCodeAt(i);

			return new B([uia], {type: t});
		 }

		function saver(url, winMode){

			if ('download' in a) { //html5 A[download]
				a.href = url;
				a.setAttribute("download", fn);
				a.className = "download-js-link";
				a.innerHTML = "downloading...";
				if (!withA) {
					D.body.appendChild(a);
				}
				setTimeout(function() {
					a.click();
					if (!withA) {
						D.body.removeChild(a);
					}
					if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(a.href);}, 250 );}
				}, 66);
				return true;
			}

			if(typeof safari !=="undefined" ){ // handle non-a[download] safari as best we can:
				url="data:"+url.replace(/^data:([\w\/\-\+]+)/, u);
				if(!window.open(url)){ // popup blocked, offer direct download:
					if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
				}
				return true;
			}

			//do iframe dataURL download (old ch+FF):
			var f = withIFrame || D.createElement("iframe");
			if (!withIFrame) {
				D.body.appendChild(f);
			}

			if(!winMode){ // force a mime that will download:
				url="data:"+url.replace(/^data:([\w\/\-\+]+)/, u);
			}
			f.src=url;
			if (!withIFrame) {
				setTimeout(function(){ D.body.removeChild(f); }, 333);
			}

		}//end saver




		if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
			return navigator.msSaveBlob(blob, fn);
		}

		if(self.URL){ // simple fast and modern way using Blob and URL:
			saver(self.URL.createObjectURL(blob), true);
		}else{
			// handle non-Blob()+non-URL browsers:
			if(typeof blob === "string" || blob.constructor===z ){
				try{
					return saver( "data:" +  m   + ";base64,"  +  self.btoa(blob)  );
				}catch(y){
					return saver( "data:" +  m   + "," + encodeURIComponent(blob)  );
				}
			}

			// Blob but not URL:
			fr=new FileReader();
			fr.onload=function(e){
				saver(this.result);
			};
			fr.readAsDataURL(blob);
		}
		return true;
	}; /* end download() */
}));
