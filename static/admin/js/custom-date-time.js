function set_datetimepicker(element){
    try{
        $(element).datetimepicker({
              format: 'YYYY-MM-DD hh:mm A',
        });
    }catch(ex){

    }

}

function set_datepicker(element){
    try{
        $(element).datetimepicker({
              format: 'YYYY-MM-DD',
              widgetPositioning: { horizontal: 'left', vertical: 'bottom'},
        });
    }catch(ex){

    }

}

function convertToUTC(dateStr) {
    // Step 1: Convert "MM-DD-YYYY hh:mm AM/PM" to a proper format for JavaScript
    let parsedDate = new Date(
        Date.parse(dateStr.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")) // Convert MM-DD-YYYY to MM/DD/YYYY
    );
  
    // Step 2: Adjust for the local timezone offset to get UTC time
    let utcDate = new Date(parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000);
  
    // Step 3: Return the UTC time in ISO format
    return utcDate.toISOString();
}
  
function formatToLocalTime(utcDateStr) {
    if(utcDateStr != ""){
        // Step 1: Create Date object from UTC string
        let utcDate = new Date(utcDateStr);
    
        // Step 2: Convert to local time components
        let year = utcDate.getFullYear();
        let month = String(utcDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        let day = String(utcDate.getDate()).padStart(2, "0");
    
        let hours = utcDate.getHours();
        let minutes = String(utcDate.getMinutes()).padStart(2, "0");
    
        // Step 3: Convert to 12-hour format with AM/PM
        let period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convert 0 to 12 for midnight
    
        // Step 4: Format the result
        return `${year}-${month}-${day} ${hours}:${minutes} ${period}`;
    }
    return "";
}

function convertLocalToUTCOLD(localDateTime) {
    // Step 1: Create a Date object from the input (assumes input is in the local browser timezone)
    let localDate = new Date(localDateTime);
    if (isNaN(localDate.getTime())) {
        console.error("Invalid date format!");
        return null;
    }
    // Step 2: Convert to UTC by adjusting for the timezone offset
    let utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
    // Step 3: Return UTC datetime in ISO format
    return utcDate.toISOString();
}

function convertLocalToUTC(localDateTime) {
    var browserDate = new Date(localDateTime);
    var utcDate = moment(browserDate).utc().format();
    // console.log("Browser Date:", browserDate);
    // console.log("UTC Date:", utcDate);
    return utcDate;
}


function randerUtcToLocal(field){
    var datetime_value = $(field).text();
    datetime_value = formatToLocalTime(datetime_value);
    $(field).text(datetime_value);
}

function randerAddListingUtcToLocal(fromField, toField){
    var datetime_value = $(fromField).val();
    if(datetime_value){
        datetime_value = formatToLocalTime(datetime_value);
        $(toField).val(datetime_value);
    }
}


