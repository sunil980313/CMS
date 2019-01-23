
var hostname = window.location.host;
var protocol = window.location.protocol;

var path = protocol + "//" + hostname;


var JsonBookingContainerUser = '[{}]';

function ConformBooking(colid) {

    var containerName = document.getElementById("containerNmetdID" + colid).innerText;

    var jJsonData = '{"containerName":"' + containerName + '"}';

    $.ajax({
        url: '' + path + '/WebService/CMS.asmx/Update_Booking_Conatiner_Status_Client',
        data: jJsonData,
        method: 'post',
        dataType: 'xml',
        success: function (response) {
            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;
            if (fnData == "1") {

                alert("Delivered Sucessfully!!!");
                getBookingContainer_Status();

            }
        },
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });


}

function CancelBooking(colId) {

    var containerName = document.getElementById("containerNmetdID" + colId).innerText;

    var jsData = '{"containerName":"' + containerName + '"}';


    $.ajax({
        url: '' + path + '/WebService/CMS.asmx/Cancel_Available_BookingContainer',
        data: jsData,
        method: 'post',
        dataType: 'xml',
        success: function (response) {
            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;
            if (fnData == "1") {

                alert("Cancel Booking Sucessful!!!");
                getBookingContainer_Status();
            }



        },
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });



}

function ViewBookingStatusPage() {

    var disdata = "";

    var avadiv = document.getElementById("AvaBookingContinerId");

    if (JsonBookingContainerUser == "") { avadiv.innerHTML = "<p style='margin: 0px auto;font-size: 22px;FONT-WEIGHT: 500;'>You have not booked yet!</p>"; return; }


    disdata += '<div class="col-lg-12">';
    disdata += '<div class="panel panel-default">';
    disdata += '<br/>';
    disdata += '<div class="table-responsive">';
    disdata += '<table class="table table-striped table-bordered table-hover" id="dataTables-example">';
    disdata += '<thead>';
    disdata += '<tr>';
    disdata += '<th>S.No</th>';
    disdata += '<th>Username</th>';
    disdata += '<th>Country</th>';
    disdata += '<th>Zone</th>';
    disdata += '<th>Container ID</th>';
    disdata += '<th>Arival Date</th>';
    disdata += '<th>Booking Status</th>';
    disdata += '<th>Action</th>';
    disdata += '</tr>';
    disdata += '</thead>';
    disdata += '<tbody>';
    disdata += '<tr class="odd gradeX">';
    for (var ex = 0; ex < JsonBookingContainerUser.length; ex++) {
        disdata += '<tr>';
        disdata += '<th scope="row">' + parseInt(ex + 1) + '</th>';
        disdata += '<td id="usernametdID' + ex + '">' + JsonBookingContainerUser[ex].username + '</td>';
        disdata += '<td id="countrytdID' + ex + '">' + JsonBookingContainerUser[ex].u_country + '</td>';
        disdata += '<td id="zonetdID' + ex + '">' + JsonBookingContainerUser[ex].u_zone + '</td>';
        disdata += '<td id="containerNmetdID' + ex + '">' + JsonBookingContainerUser[ex].u_container_name + '</td>';
        disdata += '<td id="ArriavlDatetdID' + ex + '">' + JsonBookingContainerUser[ex].u_request_date + '</td>';
        disdata += '<td id="ContinerStatustdID' + ex + '">' + JsonBookingContainerUser[ex].u_booking_status + '</td>';
        disdata += '<td>';

        if (JsonBookingContainerUser[ex].u_booking_status != "Pending") {
            if (JsonBookingContainerUser[ex].u_booking_status == "Delivered") {
                disdata += '<div class="cover_divtextfield">';
                disdata += '<button id="deliveredtdID' + ex + '" onclick="ConformBooking(' + ex + ')" disabled style="cursor: not-allowed;margin: 0px;padding: 6px 10px 6px 10px;background-color:#327335;" class="button">Delivered</button>';
                disdata += '</div>';
            }
            else {
                disdata += '<div class="cover_divtextfield">';
                disdata += '<button id="deliveredtdID' + ex + '" onclick="ConformBooking(' + ex + ')" style="margin: 0px;padding: 6px 10px 6px 10px;background-color:#4CAF50;" class="button">Delivered</button>';
                disdata += '</div>';
            }

        }

        if (JsonBookingContainerUser[ex].u_booking_status == "Pending") {

            disdata += '<div class="cover_divtextfield">';
            disdata += '<button id="canceltdID' + ex + '" style="margin: 0px;padding: 6px 10px 6px 10px;background-color:#f44336;" onclick="CancelBooking(' + ex + ')" class="button">Cancel</button>';
            disdata += '</div>';

        }

        disdata += '</td>';
        disdata += '</tr>';

    }
    disdata += '</tr>';
    disdata += '</tbody>';
    disdata += '</table>';
    disdata += '</div>';
                   
    disdata += '</div>';
                  
    disdata += '</div>';



    avadiv.innerHTML = disdata;

}

function getBookingContainer_Status() {

     var username = sessionStorage.getItem("session_UsrId");


    var jsData = '{"uid":"' + username + '"}';


    $.ajax({
        url: '' + path + '/WebService/CMS.asmx/View_BookingContainer_By_UID',
        data: jsData,
        method: 'post',
        dataType: 'xml',
        success: function (response) {
            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;
            JsonBookingContainerUser = JSON.parse(fnData);
            ViewBookingStatusPage();

        },
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });


}

function Userlogout() {

    sessionStorage.setItem("session_UsrNme", "");
    sessionStorage.setItem("session_UsrRole", "");

    window.location.href = '' + path + '/';
}

function setNavMenuClickAble(desgniation) {

    if (desgniation == "Client") {

        document.getElementById("BookingContainerID").style.display = "block";
        document.getElementById("BookingStatusID").style.display = "block";
        document.getElementById("ManageBookingContainerID").style.display = "none";


    }

    else if (desgniation == "Admin") {

        document.getElementById("BookingContainerID").style.display = "none";
        document.getElementById("BookingStatusID").style.display = "none";
        document.getElementById("ManageBookingContainerID").style.display = "block";


    }


    getBookingContainer_Status();
}

function CheckUserLoginValidation() {

    var userNmae = sessionStorage.getItem('session_UsrNme');
    var UserRole = sessionStorage.getItem('session_UsrRole');



    if (userNmae == "" || userNmae == null || UserRole == "" || UserRole == null) {

        window.location.href = '' + path + '/';

    }


    setNavMenuClickAble(UserRole);
}

CheckUserLoginValidation();