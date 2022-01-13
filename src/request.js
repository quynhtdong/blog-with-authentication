const getPost = async (url = '', data = {}) => {
    // console.log(data);
  
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  //updateUI
  const updateUI = async () => {
    const request = await fetch('http://localhost:8000/post');
    try {
      const allData = await request.json();
      const result = document.createElement("p");
      result.innerHTML = 
      `${allData.title}
      ${allData.content}`;
      document.getElementById('results').appendChild(result);
 
    } catch (error) {
      console.log("error", error);
    }
  }

  export {getPost};