var _trId = null;
var _rowId = null;
var _saveForm = null;
var _aSpanIds = null;

function DataGridEditRow(trId, aSpanIds, rowId, saveFormId, onEditFunction) {
    if (_trId != null) DataGridCancelEdit();

    for (var i = 0; i < aSpanIds.length; i++) {
        document.getElementById("edit-" + aSpanIds[i]).style.display = "block";
        document.getElementById("display-" + aSpanIds[i]).style.display = "none";
    }

    document.getElementById(trId + "-clean").style.display = "none";
    document.getElementById(trId + "-dirty").style.display = "block";

    _aSpanIds = aSpanIds;
    _trId = trId;
    _rowId = rowId;
    _saveForm = document.getElementById(saveFormId);
    if (_saveForm) _saveForm.elements["Id"].value = rowId;

    if (onEditFunction != null) onEditFunction(rowId);
}

function DataGridCancelEdit(onActionCompletedFunction) {
    if (_aSpanIds != null) {
        for (var i = 0; i < _aSpanIds.length; i++) {
            document.getElementById("edit-" + _aSpanIds[i]).style.display = "none";
            document.getElementById("display-" + _aSpanIds[i]).style.display = "block";
        }

        document.getElementById(_trId + "-clean").style.display = "block";
        document.getElementById(_trId + "-dirty").style.display = "none";

        if (onActionCompletedFunction != null) onActionCompletedFunction(_rowId);

        _rowId = null;
        _trId = null;
        _aSpanIds = null;
        _saveForm = null;
        _deleteForm = null;
    }
}

function DataGridDeleteRow(deleteFormId, rowId) {
    if (confirm("This will delete the record.")) {
        var form = document.getElementById(deleteFormId);
        form.elements["Id"].value = rowId;
        form.submit();
    }
}

function DataGridInsertRow(saveFormId, aFieldIds, aFieldNames, validationFunction, onActionCompletedFunction) {
    var form = document.getElementById(saveFormId);
    CopyFieldValues(form, aFieldIds, aFieldNames);
    form.submit();
    if (onActionCompleteFunction != null) onActionCompletedFunction(0);
}

function DataGridSaveRow(aFieldIds, aFieldNames, validationFunction, onActionCompletedFunction) {
    CopyFieldValues(_saveForm, aFieldIds, aFieldNames);
    _saveForm.submit();
    if (onActionCompletedFunction != null) onActionCompletedFunction(_rowId);
}

function CopyFieldValues(targetForm, aFieldIds, aFieldNames) {
    for (var i = 0; i < aFieldIds.length; i++) {
        var targetField = targetForm.elements[aFieldNames[i]];
        var sourceField = document.getElementById(aFieldIds[i]);
        switch (sourceField.type) {
            case "text":
            case "textarea":
            case "select-one":
            case "hidden":
                var value = $(sourceField).val() + "";
                // leading dollar signs need to be trimmed
                if (value.substring(0, 1) == "$") value = value.substring(1, value.length);
                $(targetField).val(value);
                break;
            case "checkbox":
                $(targetField).val($(sourceField).prop('checked') ? "true" : "false");
                break;
        }
    }
}

function BuildDataObject(aFieldIds, aFieldNames, extraFields, extraValues) {
    // thanks to http://stackoverflow.com/questions/4215737/convert-array-to-object

    var result = {};
    for (var i = 0; i < aFieldNames.length; i++) {
        var sourceField = document.getElementById(aFieldIds[i]);
        switch (sourceField.type) {
            case "text":
            case "select-one":
            case "hidden":
                var value = $("#" + aFieldIds[i]).val();
                // leading dollar signs need to be trimmed
                if (value.substring(0, 1) == "$") value = value.substring(1, value.length - 1);
                result[aFieldNames[i]] = value;
                break;
            case "checkbox":
                result[aFieldNames[i]] = $("#" + aFieldIds[i]).is(":checked");
                break;
        }
    }

    if (extraFields != null) {
        for (var i = 0; i < extraFields.length; i++) {
            result[extraFields[i]] = extraValues[i];
        }
    }

    return result;
}