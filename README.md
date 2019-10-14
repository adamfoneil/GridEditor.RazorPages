This is something I've used internally forever in some version or another for implementing inline table editing. I know there are much more polished and capable table editors out there, but they rely on JavaScript. I like to do stuff in Razor where possible, and in the very simplest way possible.

To use this:
- install nuget package **GridEidtor.RazorPages**
- reference javascript in your Razor pages: https://cdn.jsdelivr.net/gh/adamosoftware/GridEditor.RazorPages@1.0.3/js/GridEditor.min.js

GridEditor is meant to work within the markup of a regular HTML table. You create an instance of a `GridEditor<T>` in your Razor page, then loop through some collection in your page's model, using GridEditor methods to render controls like text boxes, dropdowns, and checkboxes. In the last `td` of your table row, use the `GridEditor.Controls` method to render edit/delete and save/cancel links.

Examples from [Ginseng](https://github.com/adamosoftware/Ginseng8):
- [Application Setup page](https://github.com/adamosoftware/Ginseng8/blob/master/Ginseng8.Mvc/Pages/Setup/Applications.cshtml) with [save](https://github.com/adamosoftware/Ginseng8/blob/master/Ginseng8.Mvc/Pages/Setup/Activities.cshtml.cs#L32) and [delete](https://github.com/adamosoftware/Ginseng8/blob/master/Ginseng8.Mvc/Pages/Setup/Activities.cshtml.cs#L39) handlers
