const commentFormHandler = async function(event) {
    event.preventDefault();
  
    const post_id = document.querySelector('.post-details').id;
    const comment_text = document.querySelector('textarea').value;
    console.log(post_id)
    console.log(comment_text)  

    if (comment_text) {
      await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          post_id,
          comment_text
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      document.location.reload();
    }
  };
  
  document
    .querySelector('#new-comment-form').addEventListener('submit', commentFormHandler);