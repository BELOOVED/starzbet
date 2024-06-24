import { isJsError } from "@sb/utils";
import { isProdServerEnv } from "../../ServerEnvironment";

const integrateGoSquared = (id: string) => {
  if(!isProdServerEnv) {
    return;
  }

  const script = document.createElement("script");

  script.async = true;

  script.innerText = `!function(g,s,q,r,d){r=g[r]=g[r]||function(){(r.q=r.q||[]).push(arguments)};d=s.createElement(q);d.src='//d1l6p2sc9645hc.cloudfront.net/gosquared.js';q=s.getElementsByTagName(q)[0];q.parentNode.insertBefore(d,q)}(window,document  ,'script','_gs'); _gs('${id}');  _gs('set', 'anonymizeIP', true);`;

  script.onerror = (e) => {
    const message = isJsError(e) ? e.message : e;

    throw new Error(`GoSquaredScript error: ${message}`);
  };

  document.body.appendChild(script);
};

export { integrateGoSquared };
