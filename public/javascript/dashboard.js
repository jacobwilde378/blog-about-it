async function newFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector('input[name="title-detail"]').value;
  const blog_text = document.querySelector('textarea[name="blog-detail"]').value;
  const response = await fetch(`/api/posts/`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      blog_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

async function deletePost(event) {
  const my_id = document.querySelector('.post').id
  const response = await fetch('/api/posts/' + my_id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}


document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
document.querySelector('.post').addEventListener('submit', deletePost)