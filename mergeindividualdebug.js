function addCustomerToTable(){
$('#tableCompareIndividuals tr').each(function()
{
    if($(this).parent()[0].tagName == 'THEAD')
        $(this).append('<th><div><label>TestTH</label><button type="button" onclick="removeColumn(this)">X</button></div></th>');
    else
    {
        let txt = "test";

        switch($(this).find("td")[0].innerHTML)
        {
            case "Identifier":
                txt=(Math.random() * 101).toString();
                break;
        }
        $(this).append('<td><div onclick="copyValToMain(this)"><i class="fa fa-copy" style="margin: 2px;"></i><label>'+txt+'</label></div></td>');
    }
});
}

function removeColumn(element)
{
let removeIndex = $(element).parent().parent().index();
$('#tableCompareIndividuals tr').each(function()
{
    if($(this).parent()[0].tagName == 'THEAD')
        $(this).children("th:eq("+removeIndex+")").remove();
    else
        $(this).children("td:eq("+removeIndex+")").remove();
});
}

function populateTable()
{
$('#tableCompareIndividuals').toggle('fast');
$('#searchForm').toggle('fast');
$('#resetForm').toggle('fast');
$('#mergeCustomer').toggle();

//fill the table
addCustomerToTable();
}

function mergeCustomer()
{

}

function resetForm()
{
$('#tableCompareIndividuals').toggle('fast');
$('#searchForm').toggle('fast');
$('#resetForm').toggle('fast');
$('#mergeCustomer').toggle();

$.each($('#tableCompareIndividuals > thead > tr > th > div > button'), function(index,item){
    item.click();
});

$.each($('#tableCompareIndividuals > tbody > tr > td:nth-child(2) > div > input'), function(index, item){
    item.value = null;
});

$.each($('#searchForm > div > input[type=text]'), function(index, item){
    item.value = null;
});
}

function copyValToMain(element)
{
let rowIndex = $(element).parent().parent().index();
let rowValue = $(element).find("label")[0].innerHTML;
$('#tableCompareIndividuals > tbody > tr:nth-child('+(rowIndex+1).toString()+') > td:nth-child(2) > div > input').val(rowValue);
}

function clearSpecificField(element)
{
$(element).parent().find('input').val("");
}

$('#tableCompareIndividuals').hide();
$('#resetForm').hide();
$('#mergeCustomer').hide();
