/*------------------------------------------------------------------
* Bootstrap Simple Admin Template
* Version: 1.2
* Author: Alexis Luna
* Copyright 2020 Alexis Luna
* Website: https://github.com/alexis-luna/bootstrap-simple-admin-template
-------------------------------------------------------------------*/
// Toggle sidebar on Menu button click
try {
    setTimeout(() => {
        
        $("#sidebarCollapse").on("click", function () {
          $("#sidebar").toggleClass("active");
          $("#body").toggleClass("active");
        });
        
        // Auto-hide sidebar on window resize if window size is small
        // $(window).on('resize', function () {
            //     if ($(window).width() <= 768) {
                //         $('#sidebar, #body').addClass('active');
                //     }
                // });
                
                // Initiate time picker
                // $('.timepicker').mdtimepicker(); 
            }, 1000);
} catch (error) {
    console.error('SCRIPT ERROR => ',error);
}