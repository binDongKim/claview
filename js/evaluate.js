$(document).ready(function() {
  setTimeout(function() {
    $('.authority-error-alert').remove();
  }, 4000);

  // autofocus on textarea as soon as it shows up
  var userResult = $('input[name="result"]').val(); // good or bad
  if(userResult) {
    $('div[data-buttons="evaluate"] button[data-result=' + userResult + ']').addClass('active'); // active the button user clicked
    $('div[data-buttons="evaluate"] button:not([data-result=' + userResult + '])').prop('disabled', true); // disable the other button
  }
  $('#opinionModal').on('shown.bs.modal', function(event) {
    $('#opinion').focus();
    var button = $(event.relatedTarget) // Button that triggered the modal
    var result = button.data('result');
    var modal = $(this);
    modal.find('.result').val(result);
    if(modal.find('.opinion').val()) {
      modal.find('.opinion').prop('readonly', true);
      modal.find('.submit-btn').prop('disabled', true);
    }
  });
  $('#opinionModal').on('hidden.bs.modal', function () {
    var modal = $(this);
    if(!(modal.find('.opinion').prop('readonly'))) {
      modal.find('.opinion').val('');
    }
  });

  $('#evaluationForm').submit(function(event) {
    event.preventDefault();
    var url = $(this).attr('action');
    var userId = $('input[name="userId"]').val();
    var result = $('input[name="result"]').val();
    var opinion = $('textarea[name="opinion"]').val();
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to edit it.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#337ab7',
      confirmButtonText: 'Yes, submit it!',
      closeOnConfirm: false
    }, function() {
      $.post(url, { id: userId, result: result, opinion: opinion }).done(function(message) {
        if(message == 'Success') {
          swal({
            title: 'Success!',
            text: 'Your evaluation has been submitted!',
            type: 'success'
          }, function() {
            location.reload();
          });
        } else {
          swal({
            title: 'Error!',
            text: 'Try it later!',
            type: 'error'
          }, function() {
            location.reload();
          });
        }
      });
    });
  });
});
