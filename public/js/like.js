let likeBtn = document.querySelector('.like-btn');
let dislikeBtn = document.querySelector('.dislike-btn');

likeBtn.addEventListener('click', function () {             
        likeBtn.classList.toggle('bg-green-500');
        likeBtn.classList.toggle('text-white');
        likeBtn.classList.toggle('transform');
        likeBtn.classList.toggle('scale-110');
        likeBtn.classList.toggle('rotate-180');
        likeBtn.innerHTML = likeBtn.classList
