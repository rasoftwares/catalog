app.controller('generalController', function($scope){
$scope.pageHeader="general Page Settings";
$scope.appName="CatalogApp";
<!--Company-->
$scope.companyName=info.company.name;
//$scope.companyName="sun microsystems";

$scope.companyTitle=info.company.title;
$scope.companyregistrationNo=info.company.registrationno;
$scope.companyregistrationYear=info.company.registrationyear;
$scope.companyownerName=info.company.owner.name;
$scope.companyphotograph=info.company.owner.photograph;
$scope.companyshortDescription=info.company.shortdescription;
<!--Contact-->
$scope.contactregisterdAddress=info.Contact.registeredaddress;
$scope.contactofficeAddress=info.Contact.officeaddress;
$scope.contactlandlineNumber=info.Contact.landlinenumber;
$scope.contactmobileNumber=info.Contact.mobilenumber;
$scope.contactemailId=info.Contact.emailid;
<!--About -->
$scope.websiteWebsite=info.website.websiteid;
$scope.websiteaboutCompany=info.website.aboutcompany;

});
