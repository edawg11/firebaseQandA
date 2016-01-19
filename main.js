'use strict'

var ref = new Firebase('https://eliotisawesome.firebaseio.com/');
var postsRef = ref.child('posts');

var $titleInput, $descInput, $postingList, $template, $myModal, $userName, $answerInput;


$(document).ready(function() {
  $template = $('#template');
  $postingList = $('#postingList');
  $titleInput = $('#titleInput');
  $descInput = $('#descInput');
  $myModal = $('#myModal');
  $userName = $('#userName');
  $answerInput = $('#answerInput');
  $('#postButton').click(addPost);
  $('#postingList').on('click', '.answerButton', answer);
  $('$myModal').on('click', '#respondModal', function(){
    console.log('clickedITTT');
  })
 
});

function addPost(e) {
  e.preventDefault();

  console.log('clicked');

  var title = $titleInput.val();
  var desc = $descInput.val();
  
  postsRef.push({
    title: title,
    desc: desc
  })
}

function answer(e){
  var id = $(this).attr('id');

  postsRef.child(id).once('value', function(snap){
    var desc = snap.val().desc;
    var title = snap.val().title;

    $('#myModalLabel').text(title);
    $('#modalDesc').text(desc);
  })

  $(myModal).modal('show');
  fillInModal();

}

function fillInModal(){
  var userName = $userName.val();
  var answerInput = $answerInput.val();
}

postsRef.on('value', function(snap) {
  var $rows = [];

  snap.forEach(function(childSnap) {
    var post = childSnap.val();

    var key = childSnap.key();
    console.log(key);

    var $tr = $template.clone();
    $tr.removeAttr('id');
    $tr.children('.postTitle').text(post.title).attr('id', key);
    $tr.find('.answerButton').attr('id', key);

    $rows.push($tr);
  })

  $postingList.empty().append($rows);
});
