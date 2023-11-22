export const injectStyle = (style: any) => {
  let styleSheet = document.styleSheets[0];;

  styleSheet.insertRule(style, styleSheet.cssRules.length);
};
