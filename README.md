This is something I've used internally forever in some version or another for implementing inline table editing. I know there are much more polished and capable table editors out there, but they rely on javascript. I like to do stuff in Razor where possible, and in the very simplest way. (There is javascript in my solution, but you might can tell it's not my first love.) Also, please note my approach has no particular backend/database/ORM dependency. In my examples, I'm using [Postulate](https://postulate-orm.io) as my ORM.

To use this:
- install nuget package **GridEditor.RazorPages**. Note this is currently in beta, so you need to include "pre-release" packages when searching in the Nuget package manager in Visual Studio.
- reference javascript in your Razor pages: https://cdn.jsdelivr.net/gh/adamosoftware/GridEditor.RazorPages@1.0.3/js/GridEditor.min.js
- create handlers in your Razor page for **save** and **delete** actions. As I mention above, there's no backend dependency here, but my examples use Postulate ORM.
- optionally, use extension method [Html.ActionAlert](https://github.com/adamosoftware/GridEditor.RazorPages/blob/master/GridEditor.RazorPages/AlertHelper.cs#L22) to convey error messages in a Bootstrap alert div. This uses `TempData`, relying on some [helper methods](https://github.com/adamosoftware/GridEditor.RazorPages/blob/master/GridEditor.RazorPages/TempDataHelper.cs) for writing success and error messages in a specific way.

GridEditor is meant to work within the markup of a regular HTML table. You create an instance of a `GridEditor<T>` in your Razor page, then loop through some collection in your page's model, using GridEditor methods to render controls like text boxes, dropdowns, and checkboxes. In the last `td` of your table row, use the `GridEditor.Controls` method to render edit/delete and save/cancel links.

These are the supported control types:
- [TextBox](https://github.com/adamosoftware/GridEditor.RazorPages/blob/master/GridEditor.RazorPages/GridEditor.cs#L167)
- [CheckBox](https://github.com/adamosoftware/GridEditor.RazorPages/blob/master/GridEditor.RazorPages/GridEditor.cs#L210)
- [DropDownList](https://github.com/adamosoftware/GridEditor.RazorPages/blob/master/GridEditor.RazorPages/GridEditor.cs#L244)

Examples from [Ginseng](https://github.com/adamosoftware/Ginseng8):
- [Application Setup page](https://github.com/adamosoftware/Ginseng8/blob/master/Ginseng8.Mvc/Pages/Setup/Applications.cshtml) with [save](https://github.com/adamosoftware/Ginseng8/blob/master/Ginseng8.Mvc/Pages/Setup/Activities.cshtml.cs#L32) and [delete](https://github.com/adamosoftware/Ginseng8/blob/master/Ginseng8.Mvc/Pages/Setup/Activities.cshtml.cs#L39) handlers

- [Activities](https://github.com/adamosoftware/Ginseng8/blob/master/Ginseng8.Mvc/Pages/Setup/Activities.cshtml) with [save](https://github.com/adamosoftware/Ginseng8/blob/master/Ginseng8.Mvc/Pages/Setup/Activities.cshtml.cs#L32) and [delete](https://github.com/adamosoftware/Ginseng8/blob/master/Ginseng8.Mvc/Pages/Setup/Activities.cshtml.cs#L39) handlers

- [AwayHours](https://github.com/adamosoftware/Ginseng8/blob/master/Ginseng8.Mvc/Pages/Setup/AwayHours.cshtml) with [save](https://github.com/adamosoftware/Ginseng8/blob/master/Ginseng8.Mvc/Pages/Setup/AwayHours.cshtml.cs#L29) and [delete](https://github.com/adamosoftware/Ginseng8/blob/master/Ginseng8.Mvc/Pages/Setup/AwayHours.cshtml.cs#L42) handlers.

Note that my save and delete handlers are specific to my backend, not related to GridEditor directly. I'm just highlighting them for completeness' sake.

![img](https://adamosoftware.blob.core.windows.net:443/images/GridEditor/GridEditor-AwayHours.gif)

Here's a blow-by-blow of the code involved in the .cshtml portion:

![img](https://adamosoftware.blob.core.windows.net:443/images/GridEditor/GridEditorAwayHours.png)

If by a strange turn of events you find this useful, please consider [buying me a coffee](https://paypal.me/adamosoftware).
