async function editPostFunction(event) {
    event.preventDefault();
    const my_title = document.querySelector('input[name="edit-title"]').value;
    const my_blog_text = document.querySelector('textarea[name="edit-text"]').value;
    const my_id = document.querySelector('input[name="edit-title"]').id
    const response = await fetch(`/api/posts/` + my_id, {
      method: 'PUT',
      body: JSON.stringify({
          id: my_id,
          title: my_title,
          blog_text: my_blog_text
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
  
  document.querySelector('.post').addEventListener('submit', editPostFunction);
  