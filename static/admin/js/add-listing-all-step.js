$(document).ready(function(){
    $('.select').chosen();
    set_datepicker('#rental_till');
    set_datepicker('.owner_dob');
    set_datetimepicker('#start_date');
    set_datetimepicker('#end_date');
    randerAddListingUtcToLocal("#utc_start_date", "#start_date"); // Rander datetime for start date
    randerAddListingUtcToLocal("#utc_end_date", "#end_date"); // Rander datetime for end date
    randerUtcToLocal("#auction_date_text_one"); // Rander datetime for reservation agreement
    randerUtcToLocal("#auction_date_text_two"); // Rander datetime for reservation agreement

    $(document).on('click', ".add_owner", function () {
        // var count = parseInt($('.child_owner').length);
        var count = parseInt($('#total_section').val());
        var account_verification_type = parseInt($('#account_verification_type').val());
        var new_child = $(".child_owner:last").clone().insertAfter(".child_owner:last");
        new_child.find(".owner_name").val("");
        new_child.find(".owner_eid").val("");
        new_child.find(".owner_passport").val("");
        new_child.find(".owner_percentage").val("");
        new_child.find(".owner_nationality").val("");
        new_child.find(".owner_dob").val("");
        new_child.find(".owner_phone").val("");
        new_child.find(".owner_email").val("");
        new_child.attr('id', 'child_owner_' + count);
        new_child.find(".owner_name").attr('id', 'owner_name_' + count).attr('name','owner_name_'+ count);
        if(account_verification_type != 2){
            new_child.find(".owner_eid").attr('id', 'owner_eid_' + count).attr('name','owner_eid_'+ count);
            new_child.find(".owner_eid").inputmask('999-9999-9999999-9');
        }else{
            new_child.find(".owner_passport").attr('id', 'owner_passport_' + count).attr('name','owner_passport_'+ count);
        }
        new_child.find(".owner_percentage").attr('id', 'owner_percentage_' + count).attr('name','owner_percentage_'+ count);
        new_child.find(".owner_nationality").attr('id', 'owner_nationality_' + count).attr('name','owner_nationality_'+ count);
        new_child.find(".owner_dob").attr('id', 'owner_dob_' + count).attr('name','owner_dob_'+ count);
        new_child.find(".owner_phone").attr('id', 'owner_phone_' + count).attr('name','owner_phone_'+ count);
        new_child.find(".owner_email").attr('id', 'owner_email_' + count).attr('name','owner_email_'+ count);
        set_datepicker('#owner_dob_'+count);
        // $("#owner_phone_"+count).inputmask('99 999 9999');
        new_child.find(".delete_child_owner").show();
        count = count+1;
        $("#total_section").val(count);
    });

    $(document).ready(function(){
        $(".owner_phone").keypress(function(event){
            if (event.which < 48 || event.which > 57) {
                event.preventDefault();
            }
        });
    });

    $(document).on('click', '.del_owner_btn', function(){
        var row_id = $(this).attr('del_element_id');
        var account_verification_type = parseInt($('#account_verification_type').val());
        if($(this).attr('id') == 'del_owner_true'){
            $('#'+row_id).remove();
            $('#confirmDltOwnerModal').modal('hide');
            $(".child_owner").each(function(index){
                $(this).attr('id', 'child_owner_' + index);
                $(this).find(".owner_name").attr('id', 'owner_name_' + index).attr('name','owner_name_'+ index);
                if(account_verification_type != 2){
                    $(this).find(".owner_eid").attr('id', 'owner_eid_' + index).attr('name','owner_eid_'+ index);
                }else{
                    $(this).find(".owner_passport").attr('id', 'owner_passport_' + index).attr('name','owner_passport_'+ index);
                }
                $(this).find(".owner_percentage").attr('id', 'owner_percentage_' + index).attr('name','owner_percentage_'+ index);
                $(this).find(".owner_nationality").attr('id', 'owner_nationality_' + index).attr('name','owner_nationality_'+ index);
                $(this).find(".owner_dob").attr('id', 'owner_dob_' + index).attr('name','owner_dob_'+ index);
                $(this).find(".owner_phone").attr('id', 'owner_phone_' + index).attr('name','owner_phone_'+ index);
                $(this).find(".owner_email").attr('id', 'owner_email_' + index).attr('name','owner_email_'+ index);
            });
            var total_section = parseInt($('.child_owner').length);
            $('#total_section').val(total_section);
        }else{
            $(this).attr('del_element_id', '');
            $('#confirmDltOwnerModal').modal('hide');
        }
    });

    $(document).on('change', '#prop_city', function(){
        var prop_city = $(this).val();
        $.ajax({
            url: '/admin/get-municipality/',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: {prop_city: prop_city},
            beforeSend: function(){
                $('.overlay').show();
            },
            success: function(response){
                $('.overlay').hide();
                if(response.error == 0){
                    $('#municipality').empty();
                    $('#district').empty();
                    $('#municipality').append('<option value="">Select</option>');
                    $.each(response.municipality, function(i, item) {
                        $('#municipality').append('<option value="'+item.id+'">'+item.municipality_name+'</option>');
                    });
                    $('#municipality').trigger("chosen:updated");
                    // -------Enable next section-------
                    var href = $("#section_two").data('href');
                    $("#section_two").attr('href', "#"+href);
                    $("#section_two").removeClass('collapsed');
                    $("#"+href).removeClass('collapse').addClass("in");
                }
            }
        });
    });

    $(document).on('change', '#municipality', function(){
        var municipality = $(this).val();
        $.ajax({
            url: '/admin/get-district/',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: {municipality: municipality},
            beforeSend: function(){
                $('.overlay').show();
            },
            success: function(response){
                $('.overlay').hide();
                if(response.error == 0){
                    $('#district').empty();
                    $('#district').append('<option value="">Select</option>');
                    $.each(response.district, function(i, item) {
                        $('#district').append('<option value="'+item.id+'">'+item.district_name+'</option>');
                    });
                    $('#district').trigger("chosen:updated");
                }
            }
        });
    });

    $(document).on('click', '.vacancy', function(){
        var vacancy = $(this).val();
        if(vacancy == 1){
            $(".rental_till_parent").show();
        }else{
            $("#rental_till").val('');
            $(".rental_till_parent").hide();
        }
    });

    // ----------------Upload Deed Section-------
    deed_params = {
        url: '/admin/save-images/',
        field_name: 'deed',
        file_accepted: '.png, .jpg, .jpeg, .pdf',
        element: 'propertyDeedFrm',
        upload_multiple: true,
        call_function: set_property_deed_details,
        default_message: '<i class="fa fa-upload" aria-hidden="true"></i> Upload Photos',
    }
    try{
        initdrozone(deed_params);
    }catch(ex){
        // console.log(ex);
    }

    // ----------------Upload Floor Plans Section-------
    floor_plan_params = {
        url: '/admin/save-images/',
        field_name: 'floor_plans',
        file_accepted: '.png, .jpg, .jpeg, .pdf',
        element: 'propertyFloorPlanFrm',
        upload_multiple: true,
        call_function: set_property_floor_plan_details,
        default_message: '<i class="fa fa-upload" aria-hidden="true"></i> Upload Photos',
    }
    try{
        initdrozone(floor_plan_params);
    }catch(ex){
        // console.log(ex);
    }


    // ----------------Upload Cover Image Section-------
    cover_image_params = {
        url: '/admin/save-images/',
        field_name: 'cover_image',
        file_accepted: '.png, .jpg, .jpeg, .pdf',
        element: 'propertyCoverImageFrm',
        upload_multiple: true,
        call_function: set_property_cover_image_details,
        default_message: '<i class="fa fa-upload" aria-hidden="true"></i> Upload Photos',
    }
    try{
        initdrozone(cover_image_params);
    }catch(ex){
        // console.log(ex);
    }

    // ----------------Upload Property Image Section-------
    property_image_params = {
        url: '/admin/save-images/',
        field_name: 'property_image',
        file_accepted: '.png, .jpg, .jpeg, .pdf',
        element: 'propertyImageFrm',
        upload_multiple: true,
        call_function: set_property_image_details,
        default_message: '<i class="fa fa-upload" aria-hidden="true"></i> Upload Photos',
    }
    try{
        initdrozone(property_image_params);
    }catch(ex){
        // console.log(ex);
    }

    // ----------------Upload Property Video Section-------
    property_video_params = {
        url: '/admin/save-images/',
        field_name: 'property_video',
        file_accepted: '.mp4',
        element: 'propertyVideoFrm',
        upload_multiple: true,
        call_function: set_property_video_details,
        default_message: '<i class="fa fa-upload" aria-hidden="true"></i> Upload Photos',
    }
    try{
        initdrozone(property_video_params);
    }catch(ex){
        // console.log(ex);
    }

    $(document).ready(function(){
        $(".owner_percentage").on("keypress", function(event){
            let charCode = event.which;
            let currentValue = $(this).val();
    
            // Allow only digits (0-9) and a single decimal point (.)
            if (
                (charCode < 48 || charCode > 57) && // Not a number
                charCode !== 46 // Not a dot (.)
            ) {
                event.preventDefault();
            }
    
            // Prevent multiple decimal points
            if (charCode === 46 && currentValue.includes(".")) {
                event.preventDefault();
            }
        });
    
        // Prevent pasting non-numeric values
        $(".owner_percentage").on("paste", function(event){
            let pasteData = (event.originalEvent || event).clipboardData.getData("text");
            if (!/^\d*\.?\d*$/.test(pasteData)) {
                event.preventDefault();
            }
        });
    });

    $("#sell_at_full_amount_status").on("change", function(){
        if($(this).is(':checked')){
            $(".full_price_field").show();
        }else{
            $(".full_price_field").hide();
        }
    });

    $("#bid_increment_status").on("change", function(){
        if($(this).is(':checked')){
            $(".bid_increment_field").show();
        }else{
            $(".bid_increment_field").hide();
        }
    });

    $('#start_date').on('dp.change', function(e) {
        $(".auction_date_text").text($(this).val());
        var utc_date_time = convertLocalToUTC($(this).val());
        $("#utc_start_date").val(utc_date_time);
    });

    $('#end_date').on('dp.change', function(e) {
        var utc_date_time = convertLocalToUTC($(this).val());
        $("#utc_end_date").val(utc_date_time);
    });

    // --------------Next button for Ownership info----------
    $(document).on('click', '#section_two_next_button', function(){
        section_two_validate();
        add_validation_rule();
        if($('#property_info_frm').valid()){
            // -------Enable next section-------
            var href = $("#section_three").data('href');
            $("#section_three").attr('href', "#"+href);
            $("#section_three").removeClass('collapsed');
            $("#"+href).removeClass('collapse').addClass("in");
            $("#"+href).css('height', 'auto');
            $("#section_two").addClass('collapsed');
            $("#collapseTwo").removeClass('in').addClass('collapse');
        }
    });

    // --------------Next button for Property details----------
    $(document).on('click', '#section_three_next_button', function(){
        section_three_validate();
        add_validation_rule();
        if($('#property_info_frm').valid()){
            // -------Enable next section-------
            var href = $("#section_four").data('href');
            $("#section_four").attr('href', "#"+href);
            $("#section_four").removeClass('collapsed');
            $("#"+href).removeClass('collapse').addClass("in");
            $("#"+href).css('height', 'auto');
            $("#section_three").addClass('collapsed');
            $("#collapseFive").removeClass('in').addClass('collapse');
        }
    });

    // --------------Next button for Property features----------
    $(document).on('click', '#section_four_next_button', function(){
        section_four_validate();
        add_validation_rule();
        if($('#property_info_frm').valid()){
            // -------Enable next section-------
            var href = $("#section_five").data('href');
            $("#section_five").attr('href', "#"+href);
            $("#section_five").removeClass('collapsed');
            $("#"+href).removeClass('collapse').addClass("in");
            $("#"+href).css('height', 'auto');
            $("#section_four").addClass('collapsed');
            $("#collapsefour").removeClass('in').addClass('collapse');
        }
        //$("#submit_button_section").show();
    });

    // --------------Next button for Uploads----------
    $(document).on('click', '#section_five_next_button', function(){
        section_five_validate();
        add_validation_rule();
        if($('#property_info_frm').valid()){
            // -------Enable next section-------
            var href = $("#section_six").data('href');
            $("#section_six").attr('href', "#"+href);
            $("#section_six").removeClass('collapsed');
            $("#"+href).removeClass('collapse').addClass("in");
            $("#"+href).css('height', 'auto');
            $("#section_five").addClass('collapsed');
            $("#collapsesix").removeClass('in').addClass('collapse');
        }
        // $("#submit_button_section").show();
    });

    // --------------Next button for Uploads----------
    $(document).on('click', '#section_six_next_button', function(){
        section_six_validate();
        add_validation_rule();
        if($('#property_info_frm').valid()){
            // -------Enable next section-------
            var href = $("#section_seven").data('href');
            $("#section_seven").attr('href', "#"+href);
            $("#section_seven").removeClass('collapsed');
            $("#"+href).removeClass('collapse').addClass("in");
            $("#"+href).css('height', 'auto');
            $("#section_six").addClass('collapsed');
            $("#collapseSeven").removeClass('in').addClass('collapse');
            var address_text = $("#prop_city option:selected").text()+ ", "+ $("#property_name").val() + ", " + $("#prop_country option:selected").text();
            $(".address_detail").text(address_text);
        }
        $("#submit_button_section").show();
    });

    // --------------Next button for aggrement----------
    $(document).on('click', '#section_seven_next_button', function(){
        final_validate();
        add_validation_rule();
        if($('#property_info_frm').valid()){
            save_property('property_info_frm', "");
        }
    });

    //  ----------------Form Submit-----------
    $(document).on('click', '#property_info_submit_next_btn, #property_info_submit_exit_btn', function(){
        // ----------Adding Validation Rule Here For Owner----------
        final_validate();
        add_validation_rule();
        if($('#property_info_frm').valid()){
            if ($(this).attr("id") == "property_info_submit_next_btn"){
                var redirection_url = ""
            }else{
                var redirection_url = "/admin/listing/"
            }
            save_property('property_info_frm', redirection_url);
        }
    });

    // -----------Form Validation----------
    $('#property_info_frm').validate({
        ignore: [],
        errorElement: 'p',
        rules:{
            prop_country:{
                required: false,
            },
            prop_city:{
                required: false,
            },
            municipality:{
                required: false,
            },
            district:{
                required: false,
            },
            project:{
                required: false,
            },
            property_name:{
                required: false,
            },
            community:{
                required: false,
            },
            property_type:{
                required: false,
            },
            building:{
                required: false,
            },
            area_size:{
                required: false,
            },
            number_beds:{
                required: false,
            },
            number_bathrooms:{
                required: false,
            },
            number_parkings:{
                required: false,
            },
            vacancy:{
                required: false,
            },
            rental_till:{
                required: function(){
                    if (parseInt($('input[name="vacancy"]:checked').val()) == 1) {
                        return true;
                    }else {
                        return false;
                    }
                },
                // required: false,
            },
            construction_status:{
                required: false,
            },
            property_amenities:{
                required: false,
            },
            property_tags:{
                required: false,
            },
            description:{
                required: false,
            },
            property_deed_id:{
                required: false,
                maxImageCount: 1,
            },
            property_floor_plan_id:{
                required: false,
                maxImageCount: 1,
            },
            property_image_id:{
                required: false,
                minImageCount: 5,
            },
            property_video_id:{
                required: false,
                maxImageCount: 1,
            },
            start_price:{
                required: false,
            },
            deposit_amount:{
                required: false,
            },
            reserve_amount:{
                required: false,
            },
            buyer_preference:{
                required: false,
            },
            start_date:{
                required: false,
            },
            end_date:{
                required: false,
            },
            is_featured:{
                required: false,
            },
            full_amount:{
                required: false,
            },
            bid_increments:{
                required: false,
            },
            signature:{
                required: false,
            },
            term_agreement:{
                required: false,
            }
        },
        messages:{
            num_beds:{
                required: "Bed is required"
            },
            num_bath:{
                required: "Bath is required"
            },
            square_footage:{
                required: "Square Footage is required"
            },
            year_build:{
                required: "Year Build is required"
            },
            total_land_acres:{
                required: "Total acres is required"
            },
            property_city:{
                required: "City is required"
            },
        },
        errorPlacement: function(error, element) {
            var range_input_arr = ['price_decrease_rate', 'dutch_auction_time', 'dutch_pause_time', 'sealed_auction_time', 'english_auction_time', 'sealed_pause_time'];
            if(element.hasClass('asset_type_radio')){
                error.insertAfter($('.asset_type_label').closest('.listing-type'));
            }else if(element.hasClass('select')){
                error.insertAfter(element.next('.chosen-container'));
            }else if(element.parent().hasClass('date')){
                error.insertAfter(element.parent());
            }else if(element.parent().hasClass('open_house_start')){
                error.insertAfter(element.parent());
            }else if(element.parent().hasClass('open_house_end')){
                error.insertAfter(element.parent());
            }else if(element.attr('name') == 'highest_offer_format'){
                error.insertAfter(element.closest('.lh46'));
            }else if(jQuery.inArray(element.attr('name'), range_input_arr) !== -1){
                error.insertAfter(element.closest('.range-slide'));
            }else{
                error.insertAfter(element);
            }
        },
        invalidHandler: function(e,validator) {
            // loop through the errors:
            console.log(validator.errorList);
            for (var i=0;i<validator.errorList.length;i++){
                console.log(validator.errorList[i].element);
                // "uncollapse" section containing invalid input/s:
                $(validator.errorList[i].element).closest('.panel-collapse.collapse').collapse('show');
            }
        }
    });
    
});

function confirm_delete_date(element){
    var del_element = $(element).closest('.child_owner').attr('id');
    $('.del_owner_btn').attr('del_element_id', del_element);
    $('#confirmDltOwnerModal').modal('show');
}

function save_property(element, redirection_url=""){
    for (instance in CKEDITOR.instances){
        CKEDITOR.instances[instance].updateElement();
    }
    //return false;
    $.ajax({
        url: '/admin/save-listing/',
        type: 'post',
        dataType: 'json',
        cache: false,
        data: $('#'+element).serialize(),
        beforeSend: function(){
            $('.overlay').show();
        },
        success: function(response){
            $('.overlay').hide();
            if(response.error == 0){
                $.growl.notice({title: "Property ", message: response.msg, size: 'large'});
                try{
                    var property_id = response.data.data.property_id;
                    var auction_id = response.data.data.auction_id;
                }catch(ex){
                    var property_id = '';
                    var auction_id = '';
                }

                if(element == 'property_info_frm' && property_id != "" && auction_id != ""){
                    var auction_type = $('option:selected','#auction_type').val();
                    try{
                       custom_response = {
                        'site_id': site_id,
                        'user_id': '',
                        'property_id': property_id,
                        'auction_id': auction_id,
                        'auction_type': auction_type,
                      };
                        // customCallBackFunc(update_bidder_socket, [custom_response]);
                    }catch(ex){
                        //console.log(ex);
                    }
                }

                window.setTimeout(function () {
                    if(redirection_url == ''){
                        window.location.href = "/admin/add-listing/" +'?property_id='+response.data.data.property_id;
                    }else{
                        window.location.href = redirection_url;
                    }
                }, 2000);
            }else{
                if(typeof(response.data) != 'undefined' && typeof(response.data.msg) != 'undefined'){
                    var msg = response.data.msg;
                }else{
                    var msg = response.msg;
                }

                var custom_msg = '';
                if(typeof(msg) === 'object'){
                    $.each(msg, function (i) {
                        try{
                            custom_msg += '<span>'+msg[i]+'</span><br>';
                        }catch(ex){
                            custom_msg += '<span>'+msg+'</span><br>';
                        }

                    });
                }else if(Array.isArray(msg)){
                    $.each(msg, function(i) {
                        custom_msg += '<span>'+msg[i]+'</span><br>';
                    });
                }else{
                    custom_msg = msg;
                }
                window.setTimeout(function () {
                    $.growl.error({title: "Property ", message: custom_msg, size: 'large'});
                }, 2000);
            }
        }
    });
}

function update_bidder_socket(response){
    if(typeof(response.auction_type) != 'undefined' && parseInt(response.auction_type) == 2){
        socket.emit("checkInsiderBid", {"user_id": response.user_id, "property_id": response.property_id, "auction_id": response.auction_id, "domain_id": response.site_id});
    }else{
        socket.emit("checkBid", {"user_id": response.user_id, "property_id": response.property_id, "auction_id": response.auction_id, "domain_id": response.site_id});
    }

}

function add_validation_rule(){
    $('.child_owner').each(function() {
        var position = $(this).find('.owner_name').attr('id');
        $("#"+position).rules("add", {
            required: true,
            messages: {
                required: "This field is required.",
            }
        });

        var position = $(this).find('.owner_eid').attr('id');
        $("#"+position).rules("add", {
            required: function(){
                if(parseInt($("#account_verification_type").val()) != 2){
                    return true;
                }else{
                    return false;
                }
            },
            maxlength: 18,
            messages: {
                required: "This field is required.",
            }
        });

        var position = $(this).find('.owner_passport').attr('id');
        $("#"+position).rules("add", {
            required: function(){
                if(parseInt($("#account_verification_type").val()) == 2){
                    return true;
                }else{
                    return false;
                }
            },
            messages: {
                required: "This field is required.",
            }
        });

        var position = $(this).find('.owner_percentage').attr('id');
        $("#"+position).rules("add", {
            required: true,
            max: 100,
            messages: {
                required: "This field is required.",
            }
        });

        var position = $(this).find('.owner_nationality').attr('id');
        $("#"+position).rules("add", {
            required: true,
            messages: {
                required: "This field is required.",
            }
        });

        var position = $(this).find('.owner_dob').attr('id');
        $("#"+position).rules("add", {
            required: true,
            messages: {
                required: "This field is required.",
            }
        });

        var position = $(this).find('.owner_phone').attr('id');
        $("#"+position).rules("add", {
            required: true,
            maxlength: 15,
            minlength: 7,
            messages: {
                required: "This field is required.",
            }
        });

        var position = $(this).find('.owner_email').attr('id');
        $("#"+position).rules("add", {
            required: true,
            email: true,
            messages: {
                required: "This field is required.",
                email: "Please enter valid email.",
            }
        });

    });
}

function section_two_validate(){
    $('#property_info_frm').validate().settings.rules = {
        prop_country:{
            required: true
        },
        prop_city:{
            required: true
        },
    };
    
}

function section_three_validate(){
    $('#property_info_frm').validate().settings.rules = {
        prop_country:{
            required: true
        },
        prop_city:{
            required: true
        },
        municipality:{
            required: true,
        },
        district:{
            required: true,
        },
        project:{
            required: true,
        },
        property_name:{
            required: true,
        },
        community:{
            required: true,
        },
        // property_type:{
        //     required: true,
        // },
        building:{
            required: true,
        },
    };
}

function section_four_validate(){
    $('#property_info_frm').validate().settings.rules = {
        prop_country:{
            required: true
        },
        prop_city:{
            required: true
        },
        municipality:{
            required: true,
        },
        district:{
            required: true,
        },
        project:{
            required: true,
        },
        property_name:{
            required: true,
        },
        community:{
            required: true,
        },
        // property_type:{
        //     required: true,
        // },
        building:{
            required: true,
        },
        area_size:{
            required: true,
        },
        number_beds:{
            required: true,
        },
        number_bathrooms:{
            required: true,
        },
        number_parkings:{
            required: true,
        },
        vacancy:{
            required: true,
        },
        rental_till:{
            required: function(){
                if (parseInt($('input[name="vacancy"]:checked').val()) == 1) {
                    return true;
                }else {
                    return false;
                }
            },
        },
        construction_status:{
            required: true,
        },
        property_amenities:{
            required: true,
        },
        property_tags:{
            required: true,
        },
        description:{
            required: true,
        },
    };
    
}

function section_five_validate(){
    $('#property_info_frm').validate().settings.rules = {
        prop_country:{
            required: true
        },
        prop_city:{
            required: true
        },
        municipality:{
            required: true,
        },
        district:{
            required: true,
        },
        project:{
            required: true,
        },
        property_name:{
            required: true,
        },
        community:{
            required: true,
        },
        // property_type:{
        //     required: true,
        // },
        building:{
            required: true,
        },
        area_size:{
            required: true,
        },
        number_beds:{
            required: true,
        },
        number_bathrooms:{
            required: true,
        },
        number_parkings:{
            required: true,
        },
        vacancy:{
            required: true,
        },
        rental_till:{
            required: function(){
                if (parseInt($('input[name="vacancy"]:checked').val()) == 1) {
                    return true;
                }else {
                    return false;
                }
            },
        },
        construction_status:{
            required: true,
        },
        property_amenities:{
            required: true,
        },
        property_tags:{
            required: true,
        },
        description:{
            required: true,
        },
        property_deed_id:{
            required: true,
            maxImageCount: 1,
        },
        property_floor_plan_id:{
            required: true,
            maxImageCount: 1,
        },
        property_image_id:{
            required: true,
            minImageCount: 5,
        },
        // property_video_id:{
        //     required: true,
        //     maxImageCount: 1,
        // }
    };
    
}

function section_six_validate(){
    $('#property_info_frm').validate().settings.rules = {
        prop_country:{
            required: true
        },
        prop_city:{
            required: true
        },
        municipality:{
            required: true,
        },
        district:{
            required: true,
        },
        project:{
            required: true,
        },
        property_name:{
            required: true,
        },
        community:{
            required: true,
        },
        // property_type:{
        //     required: true,
        // },
        building:{
            required: true,
        },
        area_size:{
            required: true,
        },
        number_beds:{
            required: true,
        },
        number_bathrooms:{
            required: true,
        },
        number_parkings:{
            required: true,
        },
        vacancy:{
            required: true,
        },
        rental_till:{
            required: function(){
                if (parseInt($('input[name="vacancy"]:checked').val()) == 1) {
                    return true;
                }else {
                    return false;
                }
            },
        },
        construction_status:{
            required: true,
        },
        property_amenities:{
            required: true,
        },
        property_tags:{
            required: true,
        },
        description:{
            required: true,
        },
        property_deed_id:{
            required: true,
            maxImageCount: 1,
        },
        property_floor_plan_id:{
            required: true,
            maxImageCount: 1,
        },
        property_image_id:{
            required: true,
            minImageCount: 5,
        },
        // property_video_id:{
        //     required: true,
        //     maxImageCount: 1,
        // }
        start_price:{
            required: true,
        },
        deposit_amount:{
            required: true,
        },
        reserve_amount:{
            required: true,
            greaterThanValue: function(){
                if ($('#reserve_amount').val() != "") {
                    return '#start_price';
                } else {
                    return false;
                }
            },
        },
        buyer_preference:{
            required: true,
        },
        start_date:{
            required: true,
        },
        end_date:{
            required: true,
            greaterThan: function(){
                if ($('#end_date').val() != "") {
                    return "#start_date";
                } else {
                    return false;
                }
            }
        },
        is_featured:{
            required: true,
        },
        full_amount: {
            required: function() {
                return $("#sell_at_full_amount_status").is(":checked");
            }
        },
        bid_increments:{
            required: function(){
                return $("#bid_increment_status").is(":checked");
            },
        },
    };
    
}

function final_validate(){
    $('#property_info_frm').validate().settings.rules = {
        prop_country:{
            required: true
        },
        prop_city:{
            required: true
        },
        municipality:{
            required: true,
        },
        district:{
            required: true,
        },
        project:{
            required: true,
        },
        property_name:{
            required: true,
        },
        community:{
            required: true,
        },
        // property_type:{
        //     required: true,
        // },
        building:{
            required: true,
        },
        area_size:{
            required: true,
        },
        number_beds:{
            required: true,
        },
        number_bathrooms:{
            required: true,
        },
        number_parkings:{
            required: true,
        },
        vacancy:{
            required: true,
        },
        rental_till:{
            required: function(){
                if (parseInt($('input[name="vacancy"]:checked').val()) == 1) {
                    return true;
                }else {
                    return false;
                }
            },
        },
        construction_status:{
            required: true,
        },
        property_amenities:{
            required: true,
        },
        property_tags:{
            required: true,
        },
        description:{
            required: true,
        },
        property_deed_id:{
            required: true,
            maxImageCount: 1,
        },
        property_floor_plan_id:{
            required: true,
            maxImageCount: 1,
        },
        property_image_id:{
            required: true,
            minImageCount: 5,
        },
        // property_video_id:{
        //     required: true,
        //     maxImageCount: 1,
        // }
        start_price:{
            required: true,
        },
        deposit_amount:{
            required: true,
        },
        reserve_amount:{
            required: true,
            greaterThanValue: function(){
                if ($('#reserve_amount').val() != "") {
                    return '#start_price';
                } else {
                    return false;
                }
            },
        },
        buyer_preference:{
            required: true,
        },
        start_date:{
            required: true,
        },
        end_date:{
            required: true,
            greaterThan: function(){
                if ($('#end_date').val() != "") {
                    return "#start_date";
                } else {
                    return false;
                }
            }
        },
        is_featured:{
            required: true,
        },
        full_amount: {
            required: function() {
                return $("#sell_at_full_amount_status").is(":checked");
            }
        },
        bid_increments:{
            required: function(){
                return $("#bid_increment_status").is(":checked");
            },
        },
        signature:{
            required: true,
        },
        term_agreement:{
            required: true,
        }
    };
    
}