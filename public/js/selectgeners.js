$('.geners').on('change', function() {
    console.log('select ');
    alert( this.value );
    let val=this.value
    $('option').each(function() {
        console.log('inside');
        
        if ( $(this).val() == 'o' ) {
            console.log("can't delete");
        }else if ( $(this).val() == val && $(this).attr('class') == 'out') {
            document.getElementById("in").innerText+=","+val
            $(this).attr('class','in')
            console.log('switch to in');
        }else if ( $(this).val() == val && $(this).attr('class') == 'in') {
            $(this).attr('class','out')
            console.log('switch to out');
            document.getElementById("in").innerText=deleteFromSpan(val);
        }
    });
  });

  function deleteFromSpan(msg){
    let arr=document.getElementById("in").innerText.split(',');
    arr.splice(arr.indexOf(msg),1);
    return arr.join(",");
    }
