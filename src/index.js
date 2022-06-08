var i=0,HEX=[];
while (i<256) HEX[i]=(256+i++).toString(16).substring(1);

export function hexoid(len) {
	len||(len=16);
	var str='',odd=len&1,l2=len-2,lh =((1+len)>>1)-1,num=lh;
	while (num--) str += HEX[256*Math.random()|0];
	odd && (str = str.substring(0, l2))
	return function () {
		if (num === 255) {
			str=''; num=lh;
			while (num--) str += HEX[256*Math.random()|0];
			odd && (str = str.substring(0, l2));
		}
		return str + HEX[++num];
	};
}
