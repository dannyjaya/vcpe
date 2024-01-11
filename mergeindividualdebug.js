let global_currentQueriedIndividual = [];
let mergeIndividualGlobalVariables = {
    individualFieldsInfo: [
        {
            countryCode: 'CA',
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
                'ContactPostals.AddressLine3': "Locality",
                'ContactPostals.AddressLine4': "Town",
                'ContactPostals.AddressLine5': "County",
                'ContactPostals.AddressLine6': 'ContactPostals.AddressLine6',
                'ContactPostals.Postcode': "Postcode",
                'ContactPostals.POBox': "PO Box",
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
            countryCode: 'US',
            fieldsOrder: [
                'Name.Forename1',
                'Name.Surname',
                'ContactPostals.AddressNumber',
                'ContactPhones.Number',
                'ContactEmails.EmailAddress',
                'ContactPostals.AddressLine1',
                'ContactPostals.AddressLine2',
                'ContactPostals.AddressLine3',
                'ContactPostals.AddressLine4',
                'ContactPostals.AddressLine5',
                'ContactPostals.AddressLine6',
                'ContactPostals.POBox'
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
                'ContactPostals.AddressLine3': "Locality",
                'ContactPostals.AddressLine4': "Town",
                'ContactPostals.AddressLine5': "County",
                'ContactPostals.AddressLine6': 'ContactPostals.AddressLine6',
                'ContactPostals.Postcode': "Postcode",
                'ContactPostals.POBox': "PO Box",
                'ContactPhones.PhoneID': "Phone Identifier",
                'ContactPhones.Number': 'Phone Number',
                'ContactPhones.DeviceType': 'Phone Device Type',
                'ContactPhones.Usage': 'Phone Usage',
                'ContactEmails.EmailID': "Email Identifier",
                'ContactEmails.EmailAddress': "Email Address",
                'ContactEmails.Usage': "Email Usage"
            }
        }
    ],
    tenantCountryCode: null, //current mapped values "CA" "GB" "US", further addition please follow this convention: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
    queriedIndividualData: [], //all queried individual data (both primary and dupes) in its original data
    selectedIndividualData: {} //selected primary individual
};

function showWidgets() {
    for (i = 0; i < arguments.length; i++) {
        KDF.showWidget(arguments[i]);
    }
}

function showSections() {
    for (i = 0; i < arguments.length; i++) {
        KDF.showSection(arguments[i]);
    }
}

function showPages() {
    for (i = 0; i < arguments.length; i++) {
        KDF.showPage(arguments[i]);
    }
}

function hideSections() {
    for (i = 0; i < arguments.length; i++) {
        KDF.hideSection(arguments[i]);
    }
}

function hideWidgets() {
    for (i = 0; i < arguments.length; i++) {
        KDF.hideWidget(arguments[i]);
    }
}

function hidePages() {
    for (i = 0; i < arguments.length; i++) {
        KDF.hidePage(arguments[i]);
    }
}

function clearFields() {
    for (i = 0; i < arguments.length; i++) {
        KDF.setVal(arguments[i], '');
    }
}

var homepage_url = "https://proservices.desktop.capreview.empro.verintcloudservices.com/party/C1/";

function addCustomerToTable(data) {
    console.log(data);

    // if($("#tableCompareIndividuals > tbody > tr:nth-child(1) > td:nth-child(n+3) > div > label:contains('"+data.person_search_results+"')").length > 0)
    //     return;

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

    let storedIndividualDataIndex = mergeIndividualGlobalVariables.queriedIndividualData.findIndex(x => x['individual-identifier'] === primaryIndividualId);

    if(storedIndividualDataIndex < 0)
    {
        console.log("Error mergeCustomer: Not Found Index");
        return;
    }

    let individualObj = mergeIndividualGlobalVariables.queriedIndividualData[storedIndividualDataIndex];

    let dataObj = {};
    dataObj['individual-identifier'] = primaryIndividualId;

    if (individualObj['Name.NameID'] !== '')
        dataObj['Name.NameID'] = individualObj['Name.NameID'];

    if (individualObj['ContactPostals.AddressID'] !== '')
        dataObj['ContactPostals.AddressID'] = individualObj['ContactPostals.AddressID'];

    if (individualObj['ContactPhones.PhoneID'] !== '')
        dataObj['ContactPhones.PhoneID'] = individualObj['ContactPhones.PhoneID'];

    if (individualObj['ContactEmails.EmailID'] !== '')
        dataObj['ContactEmails.EmailID'] = individualObj['ContactEmails.EmailID'];
    
    mergeIndividualGlobalVariables.individualFieldsInfo.find(x => x.countryCode == mergeIndividualGlobalVariables.tenantCountryCode).fieldsOrder.forEach(function(value, index){
        let mergedFieldValue = $('#tableCompareIndividuals > tbody > tr:eq('+(index+1).toString()+') > td:eq(1) > div > input').val();

        if (individualObj[value] === mergedFieldValue)
            return;

        dataObj[value] = mergedFieldValue;
    });

    console.log(dataObj);
    
    KDF.customdata('merge-individual-update', 'from form kdf custom script', true, true, dataObj);
    KDF.gotoNextPage();
    KDF.showSuccess('Success, accounts have sucessfully been merged');
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

    let individualWithKeycloak = mergeIndividualGlobalVariables.queriedIndividualData.find(x => x.existInTable === true && x['keycloak-id'] !== '')?.individualId;

    if(individualWithKeycloak === undefined)
    {
        let maxTableRow = $('#tableCompareIndividuals > tbody > tr').length;
        for(i=0;i<maxTableRow;i++)
        {
            let selectedText = "";
            for(j=3;j<=maximumLength;j++)
            {
                if(selectedText != "")
                    break;

                selectedText += $('#tableCompareIndividuals > tbody > tr:eq('+i.toString()+') > td:eq('+j.toString()+') > div > label').html();
            }

            $('#tableCompareIndividuals > tbody > tr:eq('+i.toString()+') > td:eq(2) > div > input').val(selectedText);
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

function setTenantRegion()
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

    let tenantCountryCode = null;

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
    
    mergeIndividualGlobalVariables.tenantCountryCode = tenantCountryCode;
}

function removeSearchIndividualSection(e)
{
    console.log("removeSearchIndividualSection triger");
    $(e).parent().remove();
}

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
        $.each($('#searchFormSection > .search-individual:not(:first)'), function(index, value){value.remove();});

        $.each($('.search-individual > div > input'), function(index, item){
            item.value = null;
        });
    }
}

function initializeTableColumn()
{
    if($('#tableCompareIndividuals > tbody').children().length > 0)
        return;

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

function mergeIndividualdebugTrigger(eventParamInject, kdfParamInject) {
    console.log("external js triggered");
    setTenantRegion();
    initializeTableColumn();

    console.log("Tenant Country Code: " + mergeIndividualGlobalVariables.tenantCountryCode);

    $('#tableCompareIndividuals').hide();
    $("#backToSearchPage").hide();
    $('#resetForm').hide();
    $('#mergeCustomer').hide();
    $("#resetForm").off('click').on('click', resetForm);
    $("#backToSearchPage").off('click').on('click', resetForm);
    $("#mergeCustomer").off('click').on('click', mergeCustomer);
    $("#dform_widget_button_but_merged_record").off('click').on('click', goToMergedIndividual);
    $("#dform_widget_button_but_redo").off('click').on('click', function(){
        KDF.gotoPage('search_individual');
        resetForm(true);
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
            console.log("MergeIndividual update");
            let isIndividualSuccessfullyUpdated = false;
            if(response.data?.txt_success !== undefined && response.data?.txt_success !== null && response.data?.txt_success === 'Completed')
            {
                isIndividualSuccessfullyUpdated = true;
            }

            if(isIndividualSuccessfullyUpdated == true)
            {
                let payloadObj = {
                    primaryIndividualId: $("#tableCompareIndividuals > tbody > tr:nth-child(1) > td:nth-child(2) > div > input")[0].value
                };

                let counter = 1;
                $.each(global_currentQueriedIndividual, function(index,value){
                    if(value !== payloadObj.primaryIndividualId)
                    {
                        payloadObj["duplicateIndividualId"+counter.toString()] = value;
                        ++counter;
                    }
                });

                //KDF.customdata('merge-individual', 'from form kdf custom script', true, true, payloadObj); FOR DEBUG TEMPORARITY DISABLED
            }
        }

        if (response.action == 'merge-individual') {
            console.log("mergeindividualreturn");
            //response.data.txt_result === "Customer ID's have been merged."
        }
    });

    
};

/*
    //Is the primary customer already identified?
    if (KDF.getVal('txt_customerid') !==''){
        KDF.setVal('txt_firstcustomerID',KDF.getVal('txt_customerid'));
        KDF.setVal('txt_user_to_find','first');
        KDF.showSection('box_primary');
        hideWidgets('but_select','person_search_results','hrd_search_primary');
        showWidgets('but_second','hrd_search_secondary');
        clearFields('txt_surname','txt_forename','txt_house_num_name','txt_address1','txt_email','txt_phonenum');
    }
    
    // Listen for the Search Again button being pressed and clear the fields
    $("#dform_widget_button_but_search_again").click(function(){
        clearFields('txt_customerID','txt_firstcustomerID','txt_secondcustomerID','txt_result');
    });
    
    //Take the value from the chosen field and add it to the golden record
    $(".btn-choose").click(function(){
        var button_selected = $(this);
        var clicked_data = $(button_selected).parent().prev('div.record_data').find('input').val();
        var clicked_class = $(button_selected).parent().prev('div.record_data').attr('class').split(" ")[3];
        var golden_data = "txt_golden_" + clicked_class;
        KDF.setVal(golden_data, clicked_data);
    });
    */

/*
// Sequence of events when the choose primary account button is pressed
$("#dform_widget_button_but_select").click(function(){
    var retrievedID = KDF.getVal('person_search_results');
    KDF.setVal('txt_firstcustomerID',retrievedID);
    KDF.setVal('txt_user_to_find','first');
    KDF.showSection('box_primary');
    KDF.customdata('merge-individual-retrieve', 'from form kdf custom script', true, true, {
        button_clicked:'primary',
        person_search_results:KDF.getVal('txt_firstcustomerID')
    });
    hideWidgets('but_select','person_search_results','hrd_search_primary');
    showWidgets('but_second','hrd_search_secondary');
    clearFields('txt_surname','txt_forename','txt_house_num_name','txt_address1','txt_email','txt_phonenum');
});
 
// Sequence of events when the choose second account button is pressed
$("#dform_widget_button_but_second").click(function(){
    var retrievedID = KDF.getVal('person_search_results');
    KDF.setVal('txt_secondcustomerID',retrievedID);
    KDF.setVal('txt_user_to_find','second');
    showSections('box_secondary','box_golden','area_merge_table');
    KDF.customdata('merge-individual-retrieve', 'from form kdf custom script', true, true, {
        button_clicked:'secondary',
        person_search_results:KDF.getVal('txt_secondcustomerID')
    }); 
    hideWidgets('but_second','person_search_results');
    clearFields('txt_surname','txt_forename','txt_house_num_name','txt_address1','txt_email','txt_phonenum');
    hideSections('area_confirmnodupes','area_search_check');
    showSections('box_primary_choose','box_secondary_choose');
    
});
 
// Clear merge values
$("#dform_widget_button_but_clear").click(function(){
    clearFields('txt_firstcustomerID','txt_secondcustomerID','txt_result','txt_primary_title','txt_secondary_title','txt_golden_title','txt_primary_first_name','txt_secondary_first_name','txt_golden_first_name','txt_primary_last_name','txt_secondary_last_name','txt_golden_last_name','txt_primary_house_number','txt_secondary_house_number','txt_golden_house_number','txt_primary_address','txt_secondary_address','txt_golden_address','txt_primary_city','txt_secondary_city','txt_golden_city','txt_primary_postcode','txt_secondary_postcode','txt_golden_postcode','txt_primary_country','txt_secondary_country','txt_golden_country');
    hideSections('box_primary','box_secondary','box_primary_choose','box_secondary_choose','box_golden','area_merge_table','area_search_check');
    showWidgets('but_select','hrd_search_primary');
    KDF.showSection('area_confirmnodupes');
    KDF.hideWidget('hrd_search_secondary');
});
 
//Button to swap primary and secondary customer - NOTE - The primary customer record will be the one that remains after the merge has been completed, the secondary customer record will be deleted
$("#dform_widget_button_but_swap").click(function(){
    
    KDF.setVal('txt_golden_title',KDF.getVal('txt_secondary_title')); 
    KDF.setVal('txt_golden_first_name',KDF.getVal('txt_secondary_first_name'));
    KDF.setVal('txt_golden_last_name',KDF.getVal('txt_secondary_last_name'));
    KDF.setVal('txt_golden_email',KDF.getVal('txt_secondary_email'));
    KDF.setVal('txt_golden_house_number',KDF.getVal('txt_secondary_house_number'));
    KDF.setVal('txt_golden_address',KDF.getVal('txt_secondary_address'));
    KDF.setVal('txt_golden_city',KDF.getVal('txt_secondary_city'));
    KDF.setVal('txt_golden_postcode',KDF.getVal('txt_secondary_postcode'));
    KDF.setVal('txt_golden_country',KDF.getVal('txt_secondary_country'));
    
    KDF.setVal('txt_secondary_title',KDF.getVal('txt_primary_title')); 
    KDF.setVal('txt_secondary_first_name',KDF.getVal('txt_primary_first_name'));
    KDF.setVal('txt_secondary_last_name',KDF.getVal('txt_primary_last_name'));
    KDF.setVal('txt_secondary_email',KDF.getVal('txt_primary_email'));
    KDF.setVal('txt_secondary_house_number',KDF.getVal('txt_primary_house_number'));
    KDF.setVal('txt_secondary_address',KDF.getVal('txt_primary_address'));
    KDF.setVal('txt_secondary_city',KDF.getVal('txt_primary_city'));
    KDF.setVal('txt_secondary_postcode',KDF.getVal('txt_primary_postcode'));
    KDF.setVal('txt_secondary_country',KDF.getVal('txt_primary_country'));    
 
    KDF.setVal('txt_primary_title',KDF.getVal('txt_golden_title')); 
    KDF.setVal('txt_primary_first_name',KDF.getVal('txt_golden_first_name'));
    KDF.setVal('txt_primary_last_name',KDF.getVal('txt_golden_last_name'));
    KDF.setVal('txt_primary_email',KDF.getVal('txt_golden_email'));
    KDF.setVal('txt_primary_house_number',KDF.getVal('txt_golden_house_number'));
    KDF.setVal('txt_primary_address',KDF.getVal('txt_golden_address'));
    KDF.setVal('txt_primary_city',KDF.getVal('txt_golden_city'));
    KDF.setVal('txt_primary_postcode',KDF.getVal('txt_golden_postcode'));
    KDF.setVal('txt_primary_country',KDF.getVal('txt_golden_country'));
    
});
 
*/

/*
fieldsData: {
    'Name.NameID': {
        visibility: false,
        label: "Name Identifier"
    },
    'Name.Title': {
        visibility: true,
        label: "Title"
    },
    'Name.Forename1': {
        visibility: true,
        label: "First Name"
    },
    'Name.Forename2': {
        visibility: false,
        label: 'Name.Forename2'
    },
    'Name.Forename3': {
        visibility: false,
        label: 'Name.Forename3'
    },
    'Name.Surname': {
        visibility: true,
        label: "Last Name"
    },
    'ContactPostals.AddressID': {
        visibility: false,
        label: "ContactPostals.AddressID"
    },
    'ContactPostals.AddressNumber': {
        visibility: true,
        label: "Address Number"
    },
    'ContactPostals.AddressLine1': {
        visibility: true,
        label: "Address Line 1"
    },
    'ContactPostals.AddressLine2': {
        visibility: true,
        label: "Address Line 2"
    },
    'ContactPostals.AddressLine3': {
        visibility: true,
        label: "Locality"
    },
    'ContactPostals.AddressLine4': {
        visibility: true,
        label: "Town"
    },
    'ContactPostals.AddressLine5': {
        visibility: true,
        label: "County"
    },
    'ContactPostals.AddressLine6': {
        visibility: false,
        label: 'ContactPostals.AddressLine6'
    },
    'ContactPostals.Postcode': {
        visibility: true,
        label: "Postcode"
    },
    'ContactPostals.POBox': {
        visibility: true,
        label: "PO Box"
    },
    'ContactPhones.PhoneID': {
        visibility: false,
        label: "Phone Identifier"
    },
    'ContactPhones.Number': {
        visibility: true,
        label: 'Phone Number'
    },
    'ContactPhones.DeviceType': {
        visibility: false,
        label: 'Phone Device Type'
    },
    'ContactPhones.Usage': {
        visibility: false,
        label: 'Phone Usage'
    },
    'ContactEmails.EmailID': {
        visibility: false,
        label: "Email Identifier"
    },
    'ContactEmails.EmailAddress': {
        visibility: true,
        label: "Email Address"
    },
    'ContactEmails.Usage': {
        visibility: false,
        label: "Email Usage"
    }
}
*/