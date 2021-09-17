(() => {
    var initTable = function () {

        let table = $('#kt_datatable');

        // begin first table
        table.DataTable({
            responsive: true,
            ajax: {
                url:'/businesses',
				type: 'GET',
				headers: {
                    'Content-Type': 'application/json', 
                    // 'Authorization': AUTH_TOKEN
                },
                data: {
                    pagination: {
                        perpage: 50,
					},
				},
            },
            columns: [
                { data: 'businessName' },
                { data: 'businessMobileNumber' },
				{ data: 'businessWebsiteUrl' },
				{ data: 'businessAddress'},
                { data: null, responsivePriority: -1 },
            ],
            columnDefs: [
                {
                    targets: -1,
                    title: 'Actions',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return `\
                            <div class="dropdown dropdown-inline">\
                                <a data-businessId="${data._id}" href="javascript:;" class="btn btn-sm btn-clean btn-icon" data-toggle="dropdown">\
                                    <i class="la la-cog"></i>\
                                </a>\
                                  <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
                                    <ul class="nav nav-hoverable flex-column">\
                                        <li class="nav-item"><a class="nav-link" href="#"><i class="nav-icon la la-edit"></i><span class="nav-text">Edit Details</span></a></li>\
                                        <li class="nav-item"><a class="nav-link" href="#"><i class="nav-icon la la-leaf"></i><span class="nav-text">Toggle Active</span></a></li>\
                                    </ul>\
                                  </div>\
                            </div>\
                            <a data-businessId="${data._id}" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-edit" title="Edit details">\
                                <i class="la la-edit"></i>\
                            </a>\
                            <a data-businessId="${data._id}" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-delete" title="Delete">\
                                <i class="la la-trash"></i>\
                            </a>\
                        `;
                    },
                },
            ],
        });
    };

    let resetModal = () => {
        let playerModal = $('#playerModal');
		let business_name = $("#businessName").val("");
		let business_mobile_no = $("#business_mobile_no").val("");
		let business_website_url = $("#business_website_url").val("");
		let business_description = $("#business_description").val(""); 
		let business_address = $("#business_address").val(""); 
        playerModal.modal('hide');
    }

    $(document).ready(() => {

        initTable();

        let table = $('#kt_datatable').DataTable();

        let playerModal = $('#playerModal');
        let addBtn = $("#playerBtn");
        let cancelBtn = $("#cancelPlayerBtn");

        $('#kt_datatable').on('click', '.btn-delete', function () {
            let playerId = $(this).data('playerid');
            fetch(`${HOST_URL}/players/${playerId}`, {
                method: 'DELETE', 
                headers: {
                    'Authorization': AUTH_TOKEN
                }
            })
                .then(response => response.json())
                .then(data => {
                    table.row($(this).parents('tr'))
                        .remove()
                        .draw();
                })
        })

        $('#kt_datatable').on('click', '.btn-edit', function () {
            let playerId = $(this).data('playerid');

            fetch(`${HOST_URL}/players/${playerId}`, {
                headers: {
                    'Authorization': AUTH_TOKEN
                }
            })
                .then(response => response.json())
                .then(data => {
                    let { player } = data;
                    playerModal.find('.modal-title').text('Edit Business');
                    playerModal.find('#playerName').val(player.name);
                    playerModal.find('#playerEmail').val(player.email);
                    playerModal.find('#playerRepId').val(player.repId); 
                    playerModal.find('#playerPhoneNumber').val(player.phoneNumber); 
                    playerModal.find('#playerPassword').val(player.password); 
                    playerModal.find('#playerGameSessionId').val(player.gameSessionId);
                    playerModal.find('#playerActive').prop('checked', player.active);
                    playerModal.find('#playerBtn').text('Save');
                    playerModal.find('#playerBtn').data('playerid', player._id);
                    playerModal.modal('show');
                })
        })


        cancelBtn.on('click', () => {
            resetModal();
        })

        playerModal.on('hidden.bs.modal', e => {
            resetModal();
        })

        addBtn.on('click', () => {
            let business_name = $("#businessName").val();
            let business_mobile_no = $("#business_mobile_no").val();
            let business_website_url = $("#business_website_url").val();
            let business_description = $("#business_description").val(); 
			let business_address = $("#business_address").val(); 
			let business_type = $('#business_type').find(":selected").text()
			var business_keywords = []
			$('.selected-keyword-options li').each((i,keyword)=>{
				business_keywords.push($(keyword).text())
				// alert($(keyword).text().replace())
			})
			let body = {business_name, business_type, business_mobile_no, business_website_url, business_description, business_address, business_keywords}
			console.log('data:',body)

            // let active = $("#playerActive").is(":checked");
            let businessId = addBtn.data('businessid');
            console.log('businessId: ', businessId)

            // let url = `${HOST_URL}/players`;
            let method = 'POST';

            if (typeof businessId != 'undefined') {
                url = `${url}/${businessId}`;
                method = 'PUT'
            }

            // if (!fullName || !email) {
            //     return
            // }

            // if (method == 'POST' && !password) {
            //     return;
            // }

            // let body = {
            //     fullName, email, active
            // }

            // // if (method == 'POST') {
            //     body.password = password;
            //     body.repId = repId;
            //     body.phoneNumber = phoneNumber; 
            //     body.gameSessionId = gameSessionId; 
            // // }
            // console.log(AUTH_TOKEN)
            fetch(`/post-business`, {
                method :"POST",
                headers: {
                    'Content-Type': 'application/json', 
                    // 'Authorization': AUTH_TOKEN
                },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
					method = "not equal to put"
					console.log('data: ',data)

					let { business } = data;
					console.log('data-here: ', data)
					if(data.success == false){
						alert(`${data.message}`)
						return 
					}
                    let { _id, businessName, businessMobileNumber, businessWebsiteUrl, businessAddress } = business
                    if (method == 'PUT') {
                        let row = table.row($(`a[data-businessid="${businessId}"]`).parents('tr'));
                        let rowData = row.data();
                        rowData.businessName = businessName;
                        rowData.businessMobileNumber = businessMobileNumber;
						rowData.businessWebsiteUrl = businessWebsiteUrl;
						rowData.businessAddress = businessAddress; 
                        row.data(rowData).draw();
                    } else {
                        table.row.add({
                            _id, businessName, businessMobileNumber, businessWebsiteUrl, businessAddress
                        }).draw();
                    }
                    resetModal();
                })

        });

    })
})();
