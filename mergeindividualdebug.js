let mergeIndividualGlobalVariables = {
    mergeBehavior: "updateandmerge",
    individualFieldsInfo: [
        {
            countryCode: 'ALLFIELDS', //show allfields for demo purpose (also this is all retrieved by formadapter)
            countryCodeLabel: 'Show ALL Fields',
            fieldsOrder: [
                'Name.NameID',
                'Name.Title',
                'Name.Forename1',
                'Name.Forename2',
                'Name.Forename3',
                'Name.Surname',
                'ContactPostals.AddressID',
                'ContactPostals.AddressNumber',
                'ContactPostals.AddressLine1',
                'ContactPostals.AddressLine2',
                'ContactPostals.AddressLine3',
                'ContactPostals.AddressLine4',
                'ContactPostals.AddressLine5',
                'ContactPostals.AddressLine6',
                'ContactPostals.City',
                'ContactPostals.StateCode',
                'ContactPostals.Postcode',
                'ContactPostals.Zipcode',
                'ContactPostals.POBox',
                'ContactPhones.PhoneID',
                'ContactPhones.Number',
                'ContactPhones.DeviceType',
                'ContactPhones.Usage',
                'ContactEmails.EmailID',
                'ContactEmails.EmailAddress',
                'ContactEmails.Usage'
            ],
            fieldsLabel: {
                'Name.NameID': "Name Identifier",
                'Name.Title': "Title",
                'Name.Forename1': "First Name",
                'Name.Forename2': 'Name.Forename2',
                'Name.Forename3': 'Name.Forename3',
                'Name.Surname': "Last Name",
                'ContactPostals.AddressID': "ContactPostals.AddressID",
                'ContactPostals.AddressNumber': "Address Number",
                'ContactPostals.AddressLine1': "Address Line 1",
                'ContactPostals.AddressLine2': "Address Line 2",
                'ContactPostals.AddressLine3': "AddressLine3",
                'ContactPostals.AddressLine4': "AddressLine4",
                'ContactPostals.AddressLine5': "AddressLine5",
                'ContactPostals.AddressLine6': 'AddressLine6',
                'ContactPostals.City': 'City',
                'ContactPostals.StateCode': 'State Code',
                'ContactPostals.Postcode': 'Postcode',
                'ContactPostals.Zipcode': 'Zipcode',
                'ContactPostals.POBox': 'PO Box',
                'ContactPhones.PhoneID': "Phone Identifier",
                'ContactPhones.Number': 'Phone Number',
                'ContactPhones.DeviceType': 'Phone Device Type',
                'ContactPhones.Usage': 'Phone Usage',
                'ContactEmails.EmailID': "Email Identifier",
                'ContactEmails.EmailAddress': "Email Address",
                'ContactEmails.Usage': "Email Usage"
            }
        },
        {
            countryCode: 'GB', //taken from lbedev.ukpreview.empro.verintcloudservices.com apparently proservices tenant use this config
            countryCodeLabel: 'United Kingdom',
            fieldsOrder: [
                'Name.Title',
                'Name.Forename1',
                'Name.Surname',
                'ContactPostals.AddressNumber',
                'ContactPostals.AddressLine1',
                'ContactPostals.AddressLine2',
                'ContactPostals.AddressLine3',
                'ContactPostals.AddressLine4',
                'ContactPostals.AddressLine5',
                'ContactPostals.Postcode',
                'ContactPostals.POBox',
                'ContactPhones.Number',
                'ContactEmails.EmailAddress'
            ],
            fieldsLabel: {
                'Name.Title': "Title",
                'Name.Forename1': "First Name",
                'Name.Surname': "Last Name",
                'ContactPostals.AddressNumber': "Address Number",
                'ContactPostals.AddressLine1': "Address Line 1",
                'ContactPostals.AddressLine2': "Address Line 2",
                'ContactPostals.AddressLine3': "Locality",
                'ContactPostals.AddressLine4': "Town",
                'ContactPostals.AddressLine5': "County",
                'ContactPostals.Postcode': "Postcode",
                'ContactPostals.POBox': "PO Box",
                'ContactPhones.Number': 'Phone Number',
                'ContactEmails.EmailAddress': "Email Address"
            }
        },
        {
            countryCode: 'US', //taken from usain tenant
            countryCodeLabel: 'United States',
            fieldsOrder: [
                'Name.Title',
                'Name.Forename1',
                'Name.Surname',
                'ContactPostals.AddressNumber',
                'ContactPostals.AddressLine1',
                'ContactPostals.AddressLine2',
                'ContactPostals.AddressLine3',
                'ContactPostals.City',
                'ContactPostals.StateCode',
                'ContactPostals.Zipcode',
                'ContactPostals.POBox',
                'ContactPhones.Number',
                'ContactEmails.EmailAddress'
            ],
            fieldsLabel: {
                'Name.Title': "Title",
                'Name.Forename1': "First Name",
                'Name.Surname': "Last Name",
                'ContactPostals.AddressNumber': "Address Number",
                'ContactPostals.AddressLine1': "Address Line 1",
                'ContactPostals.AddressLine2': "Address Line 2",
                'ContactPostals.AddressLine3': "Address Line 3",
                'ContactPostals.City': 'Town/City',
                'ContactPostals.StateCode': 'State',
                'ContactPostals.Zipcode': 'Zipcode',
                'ContactPostals.POBox': "PO Box",
                'ContactPhones.Number': 'Phone Number',
                'ContactEmails.EmailAddress': "Email Address"
            }
        },
        {
            countryCode: 'CA',
            countryCodeLabel: 'Canada',
            fieldsOrder: [
                'Name.Title',
                'Name.Forename1',
                'Name.Surname',
                'ContactPostals.AddressNumber',
                'ContactPostals.AddressLine1',
                'ContactPostals.AddressLine2',
                'ContactPostals.AddressLine3',
                'ContactPostals.City',
                'ContactPostals.StateCode',
                'ContactPostals.Zipcode',
                'ContactPostals.POBox',
                'ContactPhones.Number',
                'ContactEmails.EmailAddress'
            ],
            fieldsLabel: {
                'Name.Title': "Title",
                'Name.Forename1': "First Name",
                'Name.Surname': "Last Name",
                'ContactPostals.AddressNumber': "Address Number",
                'ContactPostals.AddressLine1': "Address Line 1",
                'ContactPostals.AddressLine2': "Address Line 2",
                'ContactPostals.AddressLine3': "Address Line 3",
                'ContactPostals.City': 'Town/City',
                'ContactPostals.StateCode': 'Province',
                'ContactPostals.Zipcode': 'Postal Code',
                'ContactPostals.POBox': "PO Box",
                'ContactPhones.Number': 'Phone Number',
                'ContactEmails.EmailAddress': "Email Address"
            }
        }
    ],
    tenantCountryCode: null, //current mapped values "CA" "GB" "US", further addition please follow this convention: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
    queriedIndividualData: [] //all queried individual data (both primary and dupes) in its original data, serves as data structure of the UI
};

var homepage_url = "https://proservices.desktop.capreview.empro.verintcloudservices.com/party/C1/";

function resetForm(resetSearchParam = false)
{
    KDF.hideMessages();

    $('#tableCompareIndividuals').toggle('fast');
    $('#searchFormSection').toggle('fast');
    $("#backToSearchPage").toggle('fast');
    $('#resetForm').toggle('fast');
    $('#mergeCustomer').toggle('fast');
    $('#btnSearchIndividual').toggle('fast');
    $('#addOrCondition').toggle('fast');
    $('#resetOrCondition').toggle('fast');
    
    $.each($('#tableCompareIndividuals > thead > tr > th .btn-column-remove'), function(index,item){
        item.click();
    });

    $.each($('#tableCompareIndividuals > tbody > tr > td:nth-child(2) > div > input'), function(index, item){
        item.value = null;
    });

    mergeIndividualGlobalVariables.queriedIndividualData = [];

    if (resetSearchParam === true)
    {
        $.each($('#searchFormSection > .search-individual:not(:first)'), function(index, value){
            value.remove();
        });

        $.each($('.search-individual > div > input'), function(index, item){
            item.value = null;
        });
    }
}

function addCustomerToTable(data) {
    console.log(data);

    let internalObjDataIndex = mergeIndividualGlobalVariables.queriedIndividualData.findIndex(x => x['individual-identifier'] === data['individual-identifier']);
    
    if(internalObjDataIndex < 0)
    {
        alert("something wrong"); //try to debug
    }

    if (mergeIndividualGlobalVariables.queriedIndividualData[internalObjDataIndex].existInTable === true)
        return;
    
    mergeIndividualGlobalVariables.queriedIndividualData[internalObjDataIndex] = data;
    mergeIndividualGlobalVariables.queriedIndividualData[internalObjDataIndex].existInTable = true;
    
    //jumphere
    //create thead tr
    $('#tableCompareIndividuals > thead > tr').append('<th><div class="btn-column-remove" onclick="removeColumn(this)"><i class="fa-solid fa-circle-xmark fa-2x"></i></div></th>');

    let keycloakLogo = data['keycloak-id'] !== '' ? '<i class="fa-solid fa-user-check"></i>' : '';

    //generate first row tbody td identifier
    $('#tableCompareIndividuals > tbody > tr:eq(0)').append('<td><div onclick="copyValToMain(this)"><i class="fa fa-copy" style="margin: 2px;"></i><label>' + data['individual-identifier'] + '</label>'+keycloakLogo+'</div></td>');

    //generate tbody
    mergeIndividualGlobalVariables.individualFieldsInfo.find(x => x.countryCode == mergeIndividualGlobalVariables.tenantCountryCode).fieldsOrder.forEach(function(value, index){
        $('#tableCompareIndividuals > tbody > tr:eq('+(index+1).toString()+')').append('<td><div onclick="copyValToMain(this)"><i class="fa fa-copy" style="margin: 2px;"></i><label>' + data[value] + '</label></div></td>');
    });
}

function removeColumn(element) {
    let removeIndex = $(element).closest('th').index();
    let individualId = $('#tableCompareIndividuals tr td:nth(' + removeIndex.toString() + ') label').html();

    let storedIndividualDataIndex = mergeIndividualGlobalVariables.queriedIndividualData.findIndex(x => x['individual-identifier'] === individualId && x.existInTable === true);

    if (storedIndividualDataIndex < 0) //doesn't make sense if this query returns nothing, it should exist
    {
        alert("Error: Corrupt Data, Please Reload Page. Log: function removeColumn");
        return;
    }

    mergeIndividualGlobalVariables.queriedIndividualData[storedIndividualDataIndex].existInTable = false;

    $('#tableCompareIndividuals tr').each(function () {
        if ($(this).parent()[0].tagName == 'THEAD')
            $(this).children("th:eq(" + removeIndex + ")").remove();
        else
            $(this).children("td:eq(" + removeIndex + ")").remove();
    });

    autoSelectField();
}

function populateTable() {
    KDF.hideMessages();
    
    let isAllSearchFieldEmpty = true;
    $.each($('#searchFormSection .search-individual .inputbox > input'), function(index, value){
        if (value.value != "")
        {
            isAllSearchFieldEmpty = false;
            return false;
        }
    });

    console.log("isAllSearchFieldEmpty: " + isAllSearchFieldEmpty.toString());

    if (isAllSearchFieldEmpty === true)
    {
        KDF.showWarning('Search Fields are all empty');
        return;
    }
    
    $('#tableCompareIndividuals').toggle('fast');
    $('#searchFormSection').toggle('fast');
    $("#backToSearchPage").toggle('fast');
    $('#resetForm').toggle('fast');
    $('#mergeCustomer').toggle('fast');
    $('#btnSearchIndividual').toggle('fast');
    $('#addOrCondition').toggle('fast');
    $('#resetOrCondition').toggle('fast');

    //fill the table
    $.each($(".search-individual"),function(index,value){
        let isSearchSectionEmpty = true;
        for (e of $('#searchFormSection > div:eq('+index.toString()+') > div > input'))
        {
            if(e.value !== '')
            {
                isSearchSectionEmpty = false;
                break;
            }
        }

        if (isSearchSectionEmpty === true)
            return;
        
        let individualId = $('#searchFormSection > div:eq('+index.toString()+') > div > label:contains("Identifier")').siblings('input').val();
        if(individualId == "")
        {
            KDF.customdata('merge-individual-search', 'from form kdf custom script', true, true, {
                txt_forename: $('#searchFormSection > div:eq('+index.toString()+') > div > label:contains("First Name")').siblings('input').val(),
                txt_surname: $('#searchFormSection > div:eq('+index.toString()+') > div > label:contains("Last Name")').siblings('input').val(),
                txt_house_num_name: $('#searchFormSection > div:eq('+index.toString()+') > div > label:contains("House Name/Number")').siblings('input').val(),
                txt_address1: $('#searchFormSection > div:eq('+index.toString()+') > div > label:contains("Address Line 1")').siblings('input').val(),
                txt_email: $('#searchFormSection > div:eq('+index.toString()+') > div > label:contains("Email Address")').siblings('input').val(),
                txt_phonenum: $('#searchFormSection > div:eq('+index.toString()+') > div > label:contains("Phone Number")').siblings('input').val()
            });
        }
        else
        {
            if(mergeIndividualGlobalVariables.queriedIndividualData.find(x => x['individual-identifier'] === value.value) === undefined)
            {
                mergeIndividualGlobalVariables.queriedIndividualData.push({
                    'individual-identifier': individualId,
                    existInTable: false
                });
                KDF.customdata('merge-individual-retrieve', 'from form kdf custom script', true, true, {
                    'individual-id': individualId
                });
            }
        }
    });

    setTimeout(function(){
        autoSelectField();
    }, 3000);
}

function mergeCustomer() {
    console.log("mergecustomer trigger");
    KDF.hideMessages();
    let primaryIndividualId = $("#mergedIndividualId").val();

    if(primaryIndividualId == '')
    {
        KDF.showWarning('Merged Individual Identifier is Empty');
        return;
    }

    if ($("#tableCompareIndividuals > thead > tr > th").length < 4)
    {
        KDF.showWarning('Merge Individual must have at least two Individuals');
        return;
    }

    let storedIndividualDataIndex = mergeIndividualGlobalVariables.queriedIndividualData.findIndex(x => x['individual-identifier'] === primaryIndividualId);

    if(storedIndividualDataIndex < 0)
    {
        console.log("Error mergeCustomer: Not Found Index");
        return;
    }

    let individualObj = mergeIndividualGlobalVariables.queriedIndividualData[storedIndividualDataIndex];

    let dataObj = {};
    dataObj['individual-identifier'] = primaryIndividualId;
    
    mergeIndividualGlobalVariables.individualFieldsInfo.find(x => x.countryCode == mergeIndividualGlobalVariables.tenantCountryCode).fieldsOrder.forEach(function(value, index){
        let mergedFieldValue = $('#tableCompareIndividuals > tbody > tr:eq('+(index+1).toString()+') > td:eq(1) > div > input').val();

        if (individualObj[value] === mergedFieldValue)
            return;

        dataObj[value] = mergedFieldValue;
    });

    for (let keyName of Object.keys(dataObj))
    {
        if (keyName.startsWith("Name."))
        {
            //if (individualObj['Name.NameID'] !== '')
                dataObj['Name.NameID'] = individualObj['Name.NameID'];
            break;
        }
    }

    for (let keyName of Object.keys(dataObj))
    {
        if (keyName.startsWith("ContactPostals."))
        {
            //if (individualObj['ContactPostals.AddressID'] !== '')
                dataObj['ContactPostals.AddressID'] = individualObj['ContactPostals.AddressID'];
            break;
        }
    }

    for (let keyName of Object.keys(dataObj))
    {
        if (keyName.startsWith("ContactPhones."))
        {
            //if (individualObj['ContactPhones.PhoneID'] !== '')
                dataObj['ContactPhones.PhoneID'] = individualObj['ContactPhones.PhoneID'];
            break;
        }
    }
    
    for (let keyName of Object.keys(dataObj))
    {
        if (keyName.startsWith("ContactEmails."))
        {
            //if (individualObj['ContactEmails.EmailID'] !== '')
                dataObj['ContactEmails.EmailID'] = individualObj['ContactEmails.EmailID'];
            break;
        }
    }

    if (dataObj.hasOwnProperty('ContactPostals.AddressID') === true)
    {
        for (let keyName of Object.keys(dataObj))
        {
            if (keyName.startsWith("ContactPostals.AddressLine"))
            {
                if (!dataObj.hasOwnProperty('ContactPostals.AddressLine1'))
                    dataObj['ContactPostals.AddressLine1'] = individualObj['ContactPostals.AddressLine1'];
                if (!dataObj.hasOwnProperty('ContactPostals.AddressLine2'))
                    dataObj['ContactPostals.AddressLine2'] = individualObj['ContactPostals.AddressLine2'];
                if (!dataObj.hasOwnProperty('ContactPostals.AddressLine3'))
                    dataObj['ContactPostals.AddressLine3'] = individualObj['ContactPostals.AddressLine3'];
                if (!dataObj.hasOwnProperty('ContactPostals.AddressLine4'))
                    dataObj['ContactPostals.AddressLine4'] = individualObj['ContactPostals.AddressLine4'];
                if (!dataObj.hasOwnProperty('ContactPostals.AddressLine5'))
                    dataObj['ContactPostals.AddressLine5'] = individualObj['ContactPostals.AddressLine5'];
                if (!dataObj.hasOwnProperty('ContactPostals.AddressLine6'))
                    dataObj['ContactPostals.AddressLine6'] = individualObj['ContactPostals.AddressLine6'];
                break;
            }
        }
    }

    if (dataObj.hasOwnProperty('Name.NameID') === true)
    {
        for (let keyName of Object.keys(dataObj))
        {
            if (keyName.startsWith("Name.Forename"))
            {
                if (!dataObj.hasOwnProperty('Name.Forename1'))
                    dataObj['Name.Forename1'] = individualObj['Name.Forename1'];
                if (!dataObj.hasOwnProperty('Name.Forename2'))
                    dataObj['Name.Forename2'] = individualObj['Name.Forename2'];
                if (!dataObj.hasOwnProperty('Name.Forename3'))
                    dataObj['Name.Forename3'] = individualObj['Name.Forename3'];
                break;
            }
        }
    }

    console.log(dataObj);

    if (mergeIndividualGlobalVariables.mergeBehavior !== "none")
        KDF.customdata('merge-individual-update', 'from form kdf custom script', true, true, dataObj);
    KDF.gotoNextPage();
    setMergeCompleteSummary();
}

function setMergeCompleteSummary()
{
    $('.page-completed-body-summary').first().html('<div class="page-completed-body-summary"> <h3>Summary</h3> <hr style="margin:0px;width:40%"> <div class="summary-primary-individual"> <label style="width:300px">Primary Individual</label> <label>:</label> <label></label> </div> <div class="summary-merged-individuals"> <label style="width:300px">Merged Individual(s)</label> <label>:</label> <label></label> </div> </div>');
    
    let primaryIndividualId = $("#tableCompareIndividuals > tbody > tr:nth-child(1) > td:nth-child(2) > div > input")[0].value;
    $('.summary-primary-individual > label:nth-child(3)').html(primaryIndividualId);

    let mergedIndividuals = "";

    mergeIndividualGlobalVariables.queriedIndividualData.filter(x => x.existInTable === true && x['individual-identifier'] !== primaryIndividualId).forEach(e => {
        if (mergedIndividuals !== "")
            mergedIndividuals += ", ";
        mergedIndividuals += e['individual-identifier'];
    });

    $('.summary-merged-individuals > label:nth-child(3)').html(mergedIndividuals);
}

function setMergedCustomerColumn(columnIndex)
{
    console.log("test");

    $('#tableCompareIndividuals > tbody > tr:eq(0) > td:eq(1) > div > input').val()
    
    $.each($('#tableCompareIndividuals > tbody > tr'), function(index, value){
        $('#tableCompareIndividuals > tbody > tr:eq('+index.toString()+') > td:eq(1) > div > input').val($('#tableCompareIndividuals > tbody > tr:eq('+index.toString()+') > td:eq('+columnIndex.toString()+') > div label').html());
    });
}

function copyValToMain(element)
{
    let rowIndex = $(element).closest('tr').index();
    let rowValue = $(element).find('label').html();

    $('#tableCompareIndividuals > tbody > tr:eq('+rowIndex.toString()+') > td:nth-child(2) > div > input').val(rowValue);

    if(rowIndex == 0) //identifiercopy
    {
        setMergedCustomerColumn($(element).closest('td').index());
    }
}

function clearSpecificField(element)
{
    $(element).parent().find('input').val("");
}

function searchAddOrCondition()
{
    $('#searchFormSection').first().append($('#searchFormSection').find(".search-individual").first().clone());
    $.each($('#searchFormSection').find(".search-individual").last().find('input'),function(index,value){
        value.value = "";
    });
}

function searchResetOrCondition()
{
    KDF.hideMessages();

    $.each($('#searchFormSection > .search-individual:not(:first)'), function(index, value){value.remove();});
    $.each($('#searchFormSection > .search-individual > .inputbox > input'), function(index, value){
        value.value ='';
    });
}

function autoSelectField()
{
    if($("#tableCompareIndividuals > thead > tr > th").length <= 2)
    {
        $.each($('#tableCompareIndividuals > tbody > tr > td:nth-child(2) > div > input'), function (index, item) {
            item.value = null;
        });
        return;
    }

    let maximumLength = $("#tableCompareIndividuals > thead > tr > th").length;

    if(maximumLength <= 2)
        return;

    let individualWithKeycloak = mergeIndividualGlobalVariables.queriedIndividualData.find(x => x.existInTable === true && x['keycloak-id'] !== '');

    if (individualWithKeycloak !== undefined)
        individualWithKeycloak = individualWithKeycloak["individual-identifier"];

    if(individualWithKeycloak === undefined)
    {
        let maxTableRow = $('#tableCompareIndividuals > tbody > tr').length;
        for(i=0;i<maxTableRow;i++)
        {
            let selectedText = "";
            for(j=2;j<=maximumLength;j++)
            {
                selectedText = $('#tableCompareIndividuals > tbody > tr:eq('+i.toString()+') > td:eq('+j.toString()+') > div > label').html();

                if(selectedText !== "")
                    break;
            }

            $('#tableCompareIndividuals > tbody > tr:eq('+i.toString()+') > td:eq(1) > div > input').val(selectedText);
        }

        return;
    }

    let individualWithKeycloakTableColumnIndex = $('#tableCompareIndividuals > tbody > tr:eq(0) > td > div label:Contains("'+individualWithKeycloak+'")').closest('td').index();

    $.each($('#tableCompareIndividuals > tbody > tr'), function(index, value){
        $('#tableCompareIndividuals > tbody > tr:eq('+index.toString()+') > td:eq(1) > div > input').val($('#tableCompareIndividuals > tbody > tr:eq('+index.toString()+') > td:eq('+individualWithKeycloakTableColumnIndex.toString()+') > div label').html());
    });
}

function goToMergedIndividual()
{
    var customerID = $("#tableCompareIndividuals > tbody > tr:nth-child(1) > td:nth-child(2) > div > input")[0].value;
    window.open(homepage_url + customerID);
}

function setTenantRegion(tenantCountryCode = null) //highly recommended to pass the value to this param to avoid auto-select
{
    if (window.location.host.split('.')[0] === 'proservices')
        tenantCountryCode = "GB";

    if (tenantCountryCode === null) //this is for auto detect, not really reliable unless you tune the possible values. for example usain tenant is stgeuw idk where to put that.
    {
        let possibleValues = [
            "capreview","ca",
            "uspreview","us",
            "ukpreview","uk"
        ];

        let hostSplit = window.location.host.split('.');
        let hostRegion = undefined;

        possibleValues.every(v => {
            hostRegion = hostSplit.find(e => e == v);
            if (hostRegion !== undefined)
                return false;
            return true;
        });

        if (hostRegion === undefined)
        {
            alert("Warning: Unable to determine tenant region from url host name. Setting default region to capreview"); //proservices tenant default
            hostRegion = "capreview";
        }

        switch(hostRegion)
        {
            case "capreview":
                tenantCountryCode = "CA";
                break;
            case "ca":
                tenantCountryCode = "CA";
                break;
            case "uspreview":
                tenantCountryCode = "US";
                break;
            case "us":
                tenantCountryCode = "US";
                break;
            case "ukpreview":
                tenantCountryCode = "GB";
                break;
            case "uk":
                tenantCountryCode = "GB";
                break;
        }
    }
    
    mergeIndividualGlobalVariables.tenantCountryCode = tenantCountryCode;
}

function removeSearchIndividualSection(e)
{
    console.log("removeSearchIndividualSection triger");
    $(e).parent().remove();
}

function initializeTableColumn()
{
    if($('#tableCompareIndividuals > tbody').children().length > 0)
        $('#tableCompareIndividuals > tbody').html('');

    let individualFieldsInfo = mergeIndividualGlobalVariables.individualFieldsInfo.find(x => x.countryCode == mergeIndividualGlobalVariables.tenantCountryCode);

    if (individualFieldsInfo === undefined)
    {
        console.log("Error initializeTableColumn: Unable to find individualFieldsInfo with query Country Code");
        return;
    }

    let fieldsInfo = individualFieldsInfo.fieldsOrder;

    if (fieldsInfo === undefined)
    {
        console.log("Error initializeTableColumn: Unable to find fieldsOrder");
        return;
    }

    //row 1 must be identifier
    $('#tableCompareIndividuals > tbody').append('<tr><td>Identifier</td><td><div><input type="text" id="mergedIndividualId" class="txb-input individual-id" disabled><div class="refresh-field" onclick="clearSpecificField(this)"><i class="fa fa-refresh" style="margin: 2px;"></i></div></div></td></tr>');

    fieldsInfo.forEach(function(e){
        let labelText = individualFieldsInfo.fieldsLabel[e];
        $('#tableCompareIndividuals > tbody').append('<tr><td>'+labelText+'</td><td><div><input type="text" class="txb-input"><div class="refresh-field" onclick="clearSpecificField(this)"><i class="fa fa-refresh" style="margin: 2px;"></i></div></div></td></tr>');
    });
}

function setCountryCode()
{
    if($('#tableCompareIndividuals').is(':visible') === true)
        resetForm();
    mergeIndividualGlobalVariables.tenantCountryCode = $('#countryCode').val();
    console.log("Tenant Country Code: " + mergeIndividualGlobalVariables.tenantCountryCode);
    initializeTableColumn();
}

function setMergeOption()
{
    mergeIndividualGlobalVariables.mergeBehavior = $('#mergeOption').val();
    console.log("Merge Individual Behavior: " + mergeIndividualGlobalVariables.mergeBehavior);
}

function setHTMLMergeOptions()
{
    mergeIndividualGlobalVariables.individualFieldsInfo.forEach(e => {
        $('#countryCode').append('<option value="' + e.countryCode + '">'+ e.countryCodeLabel +'</option>');
    });
}

function initializePageComplete()
{
    let rawHtml = '<div class="page-completed-body-summary"> <p1>summary</p1> </div> <div class="page-completed-navigation-footer"> <button id="button_go_to_merged_record" type="button" class="btn-gov" onclick="goToMergedIndividual()"><i class="fa-regular fa-user"></i> Go To Merged Record</button> <button id="button_merge_another" type="button" class="btn-gov-secondary" onclick="button_merge_another_OnClick()"><i class="fa-solid fa-repeat"></i> Merge Another</button> </div>';
    $('#dform_widget_html_ahtm_merge_complete_summary').append(rawHtml);
}

function button_merge_another_OnClick()
{
    KDF.gotoPage('search_individual');
    resetForm(true);
}

function mergeIndividualdebugTrigger(eventParamInject, kdfParamInject) {
    console.log("external js triggered");
    initializePageComplete();
    setHTMLMergeOptions();
    setTenantRegion(); //just hard code this during deployment. one time setup. proservices tenant not using CA but GB
    $('#countryCode').val(mergeIndividualGlobalVariables.tenantCountryCode);
    console.log("Tenant Country Code: " + mergeIndividualGlobalVariables.tenantCountryCode);
    initializeTableColumn();

    mergeIndividualGlobalVariables.mergeBehavior = "updateandmerge";
    $('#mergeOption').val("updateandmerge");

    $('#tableCompareIndividuals').hide();
    $("#backToSearchPage").hide();
    $('#resetForm').hide();
    $('#mergeCustomer').hide();
    $("#resetForm").off('click').on('click', function (){
        resetForm(true);
    });
    $("#backToSearchPage").off('click').on('click', function(){
        resetForm();
    });
    $("#mergeCustomer").off('click').on('click', function(){
        mergeCustomer();
    });
    $('#dform_merge_individual').off('_KDF_custom').on('_KDF_custom', function(event, kdf, response, action) {
        console.log("FORMADAPTER TRIGGER: " + response.action);
        if (response.action == 'merge-individual-search') { 
            $.each(response.data.person_search_results, function(index, value){
                if(mergeIndividualGlobalVariables.queriedIndividualData.find(x => x['individual-identifier'] === value.value) === undefined)
                {
                    mergeIndividualGlobalVariables.queriedIndividualData.push({
                        'individual-identifier': value.value,
                        existInTable: false
                    });
                    KDF.customdata('merge-individual-retrieve', 'from form kdf custom script', true, true, {
                        'individual-id': value.value
                    });
                }
            });
        }

        if (response.action == 'merge-individual-retrieve') {
            addCustomerToTable(response.data);
        }
        
        if (response.action == 'merge-individual-update') {
            console.log("Form Adapter Response: merge-individual-update");
            let isIndividualSuccessfullyUpdated = false;
            if(response.data?.status !== undefined && response.data?.status !== null && response.data?.status === 'success')
            {
                isIndividualSuccessfullyUpdated = true;
            }

            if(isIndividualSuccessfullyUpdated == true)
            {
                $('.summary-primary-individual > label').first().prepend('<i style="color:green" class="fa-regular fa-circle-check"></i> ');

                let payloadObj = {
                    primaryIndividualId: $("#tableCompareIndividuals > tbody > tr:nth-child(1) > td:nth-child(2) > div > input")[0].value
                };

                let counter = 1;
                mergeIndividualGlobalVariables.queriedIndividualData.filter(x => x.existInTable === true && x['individual-identifier'] !== payloadObj.primaryIndividualId).forEach(e => {
                    payloadObj["duplicateIndividualId"+counter.toString()] = e['individual-identifier'];
                    ++counter;
                });

                console.log(payloadObj);
                
                if (mergeIndividualGlobalVariables.mergeBehavior === "updateandmerge")
                    KDF.customdata('merge-individual', 'from form kdf custom script', true, true, payloadObj);
            }
        }

        if (response.action == 'merge-individual') {
            console.log("mergeindividualreturn");
            
            if(response.data?.status !== undefined && response.data?.status !== null && response.data?.status === 'success')
            {
                $('.summary-merged-individuals > label').first().prepend('<i style="color:green" class="fa-regular fa-circle-check"></i> ');
            }
        }
    });
};