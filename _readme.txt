CODING CONVENTIONS FOR FRONTEND DEVELOPERS
------------------------------------------

Please, read it carefully and make sure you are following the rules in the process of development.

0. Always use the latest html version for developing new features. Ask Josh or Vitali for it.
1. Supported browsers: Chrome latest version (Windows, Mac, IPad, IPhone), Firefox 3.6+ (Windows), IE 8.0+ (Windows), Safari 4.0+ (Windows, Mac, Ipad, IPhone)
Make sure your markup looks similar in all these browsers.
2. All indents in your custom css and html files must be tabulated. Do not use whitespaces for this purpose, please.
3. Please use next style for css markup:

.selector {
	param1: value1;
	param2: value2;
}

4. When creating any html form, please make sure that at least one field in the form marked up as field validation error style.
5. When creating mobile version of some page, please make sure you use the same markup as for desktop version. Appearance must only be changed with css classes.
6. When creating any page, please use default layout for it. Some custom layout could be only used if it is absolutely needed in place or there are no such standard layouts in the sources.
7. Do not apply custom css classes for html, body tags, it is only possible to do for custom layouts or in base layout for all pages.
8. When creating css styles for buttons, please take a look first on existing ones, instead of creating new ones.
9. Please use local relative pathes for image urls.
10. Please do not use element ids for applying css rules. Use classes for it.
11. Use CR+LF only for file line endings. 