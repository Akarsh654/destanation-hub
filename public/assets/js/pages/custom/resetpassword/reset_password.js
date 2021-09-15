"use strict";
// Class Definition

var validation; 

validation = FormValidation.formValidation(
	KTUtil.getById('kt_reset_password_form'),
	{
		fields: {
			password: {
				validators: {
					// min: 7,
					notEmpty: {
						message: 'The password is required'
					},
					identical: {
						compare: function() {
							return $('input[name="confirmPassword"]').val();
						},
						message: 'The password and its confirm are not the same'
					}
				}
			},
			confirmPassword: {
				validators: {
					identical: {
						compare: function() {
							return $('input[name="password"]').val();
						},
						message: 'The password and its confirm are not the same'
					}
				}
			}
		},
		plugins: {
			trigger: new FormValidation.plugins.Trigger(),
			submitButton: new FormValidation.plugins.SubmitButton(),
			//defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
			bootstrap: new FormValidation.plugins.Bootstrap()
		}
	}
);

$('#kt_reset_password_submit').on('click', function (e) {
	e.preventDefault();

	validation.validate().then(function(status) {
		console.log('token:', $('input[name="token"]').val())
		var token = $('input[name="token"]').val();
		var password = $('input[name="password"]').val()
		let HOST_URL = 'http://localhost:4000'

		var data = {token: token, password: password}
		if (status == 'Valid') {
			fetch(`${HOST_URL}/reset`, {
				method: 'POST', 
				headers: {
					'Content-Type': 'application/json', 
				},
				body: JSON.stringify(data)
			})
				.then(response => response.json())
				.then(data => {
					console.log(data)
					// if unsuccessful then show error message
					if(data.success != true){
						var icon = "error"
					}else{
						var icon = `success`
					}
					swal.fire({
						text: data.message,
						icon: icon,
						buttonsStyling: false,
						confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn font-weight-bold btn-light-primary"
						}
					}).then(function() {
						window.location.href = "http://localhost:3000/login"
						KTUtil.scrollTop();
					});

				})
			swal.fire({
				text: "All is cool! Now you submit this form",
				icon: "success",
				buttonsStyling: false,
				confirmButtonText: "Ok, got it!",
				customClass: {
					confirmButton: "btn font-weight-bold btn-light-primary"
				}
			}).then(function() {
				KTUtil.scrollTop();
			});
		} else {
			swal.fire({
				text: "Sorry, looks like there are some errors detected, please try again.",
				icon: "error",
				buttonsStyling: false,
				confirmButtonText: "Ok, got it!",
				customClass: {
					confirmButton: "btn font-weight-bold btn-light-primary"
				}
			}).then(function() {
				KTUtil.scrollTop();
			});
		}
	});
});