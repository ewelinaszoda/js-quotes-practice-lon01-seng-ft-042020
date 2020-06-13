//-------------------------
// const
//-------------------------

const quoteListUl = document.querySelector('#quote-list');
const BASE_URL = 'http://localhost:3000/quotes';
//-------------------------
// get all Quotes
// ------------------------

function getAllQuotes() {
  return fetch('http://localhost:3000/quotes?_embed=likes')
    .then((response) => response.json())
    .then(function renderQuotes(quotesArray) {
      showAllQuotes(quotesArray);
    })
    .catch(function handleError(error) {
      console.log('there was an error fetching the data');
      console.error(error);
    });
}

function renderQuotes(quotesArray) {
  showAllQuotes(quotesArray);
  return quotesArray;
}

function showAllQuotes(quotesArray) {
  quotesArray.forEach(function (quote) {
    showOneQuote(quote);
  });
}

// --- show one quote
function showOneQuote(quote) {
  const li = makeElement(quote);
  quoteListUl.append(li);
  // console.log(quoteListUl);
}

// --- make element li
function makeElement(quote) {
  const li = document.createElement('li');
  li.classList.add('quote-card');

  const blockquote = document.createElement('blockquote');
  blockquote.classList.add('blockquote');

  const p = document.createElement('p');
  p.classList.add('mb-0');
  p.innerText = quote.quote;

  const footer = document.createElement('footer');
  footer.classList.add('blockquote-footer');
  footer.innerText = quote.author;

  const br = document.createElement('br');

  ////?????????????? Not working properly 
  const likesButton = document.createElement('button');
  likesButton.classList.add('btn-success');
  // need to be 0 when I create the quote 
  likesButton.innerHTML = `Likes: <span>0</span>`;
  // need to be ${quote.likes.length} when I would like to increment by 1
  likesButton.innerHTML = `Likes: <span>${quote.likes.length}</span>`;
  // --- update the number of likes by clicking the likes button, patch request, backend fronted
  likesButton.addEventListener('click', function (event) {
    event.preventDefault();
    post(quote);
    likesButton.innerHTML = `Likes: <span>${quote.likes.length += 1 }</span>`;
  });

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn-danger');
  deleteButton.innerText = 'Delete';
  // --- delete the quote by clicking the delete button, delete request, backend frontend
  deleteButton.addEventListener('click', function (event) {
    // debugger
    // console.log(event);
    event.preventDefault();
    deleteQuote(quote);
    event.target.parentNode.parentNode.remove();
  });

  blockquote.append(p, footer, br, likesButton, deleteButton);
  //   console.log(blockquote);

  li.append(blockquote);
  //   console.log(li);
  return li;
}

// --------------------------
// delete quote
// -------------------------

function deleteQuote(quote) {
  const configObject = {
    method: 'DELETE',
    // headers: {
    // 'Content-Type': 'application/json',
    // Accept: 'application/json'
    // },
    // body: JSON.stringify({
    //     id: quote.id,
    //     quote: quote.quote,
    //     author: quote.author
    // })
  };

  fetch(BASE_URL + '/' + quote.id, configObject);
}

// -----------------------------
// like quote
// -----------------------------

function post(quote) {
  const object = {
    quoteId: quote.id,
  };

  return fetch('http://localhost:3000/likes', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(object),
  })
    .then((response) => response.json())
    .catch(function handleError(error) {
      console.log('there was an error posting the likes');
      console.error(error);
    });
}

//----------------------------
// form section
// ---------------------------

form = document.querySelector('#new-quote-form');

// --- submitting the form
// --- add the new quote to the list backend and frontend, post request

form.addEventListener('submit', function (event) {
  event.preventDefault();
  // console.log(event)

  const object = {
    quote: form[0].value,
    author: form[1].value,
  };

  fetch('http://localhost:3000/quotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
  })
    .then((response) => response.json())
    .then(function (object) {
      showOneQuote(object);
    })
    .catch(function handleError(error) {
      console.log('there was an error posting the data');
      console.error(error);
    });
  form.reset();
});

// --- invoke the master function

getAllQuotes();
