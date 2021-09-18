$(document).ready(()=>{
        user = JSON.parse(localStorage.getItem('user'))
        $("#fullName").val(user.fullName);
		$("#email").val(user.email);
		$("#password").val(user.password);
		// $("#business_description").val(""); 
        // $("#business_address").val(""); 
        

        $('#playerBtn').on('click', ()=>{
            swal.fire({
                text: "Profile Successfully Updated (not really though, just a UI for now)",
                icon:"success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                    confirmButton: "btn font-weight-bold btn-light-primary"
                }
            }).then(function() {
                if(icon == "success"){
                    window.location.href = "/business"
                }
                KTUtil.scrollTop();
            });

            // fetch(`/profile/${id}`, 
            // {
            //     method: "POST", 
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }, 
            //     body: JSON.stringify(data)
            // }).then()
        })


})