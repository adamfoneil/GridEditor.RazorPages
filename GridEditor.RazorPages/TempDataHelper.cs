using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System;

namespace GridEditor.RazorPages
{
    public static class TempDataHelper
    {
        public static void SetSuccessMessage(this ITempDataDictionary tempData, string message)
        {
            tempData.Remove(AlertCss.Success);
            if (string.IsNullOrEmpty(message)) return;
            tempData.Add(AlertCss.Success, message);
        }

        public static void SetErrorMessage(this ITempDataDictionary tempData, string message)
        {
            tempData.Remove(AlertCss.Error);
            tempData.Add(AlertCss.Error, message);
        }

        public static void SetErrorMessage(this ITempDataDictionary tempData, Exception exception)
        {
            tempData.Remove(AlertCss.Error);
            tempData.Add(AlertCss.Error, exception.Message);
        }

        public static void ClearErrorMessage(this ITempDataDictionary tempData)
        {
            tempData.Remove(AlertCss.Error);
        }
    }
}
