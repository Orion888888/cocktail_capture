let likeBtn = document.querySelector('.like-btn');
let dislikeBtn = document.querySelector('.dislike-btn');

likeBtn.addEventListener('click', function () {             
        likeBtn.classList.toggle('bg-green-500');
        likeBtn.classList.toggle('text-white');
        likeBtn.classList.toggle('transform');
        likeBtn.classList.toggle('scale-110');
        likeBtn.classList.toggle('rotate-180');
        likeBtn.innerHTML = likeBtn.classList                                     .contains('bg-green-500') ? 
        '<i class="fas fa-thumbs-down text-white text-xl"></i>' 
      : '<i class="fas fa-thumbs-up text-gray-500 text-xl"></i>';
      dislikeBtn.classList
                  .remove('bg-red-500', 'text-white', 
                        'transform', 'scale-110', 'rotate-180');
      dislikeBtn.innerHTML = 
        '<i class="fas fa-thumbs-down text-gray-500 text-xl"></i>';
  });
