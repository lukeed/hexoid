var i=0,HEX=[];
while (i<256) HEX[i]=(256+i++).toString(16).substring(1);

export function hexoid(len) {
	len||(len=16);
	var str='',lh =((1+len)>>1)-1,num=lh;
	while (num--) str += HEX[256*Math.random()|0];
	return function () {
		if (num === 255) {
			str=''; num=lh;
			while (num--) str += HEX[256*Math.random()|0];
		}
		return str + HEX[++num];
	};
}
