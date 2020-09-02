export function removePrefersReducedMotionFromAnimationCSS () {
  if(typeof window.CSSMediaRule !== "function")
    return false; //Your browser doesn't support media query feature

  var s = document.styleSheets, r,
    i, j, k;

  if(!s) return false; //no style sheets found

  // walk throuth css sheets
  for(i=0; i<s.length; i++) {
    // get all rules
    r = s[i].cssRules;
    if(!r) continue;

    for(j=0; j<r.length; j++) {
      //If there's a rule for media query
      if(r[j] instanceof CSSMediaRule &&
        r[j].media.mediaText == "print, (prefers-reduced-motion: reduce)") {
        for(k=0; k<r[j].cssRules.length; k++) {
          // remove all rules of it
          r[j].deleteRule(r[j].cssRules[k]);
        }
        return true;
      }
    }
  }
}
