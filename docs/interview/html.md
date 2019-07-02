## What is a MIME type and what is it used for?

MIME is an acronym for Multi-purpose Internet Mail Extensions. It is used as a standard way of classifying file types over the Internet.
Good to hear

    A MIME type actually has two parts: a type and a subtype that are separated by a slash (/). For example, the MIME type for Microsoft Word files is application/msword (i.e., type is application and the subtype is msword).


## What is a focus ring? What is the correct solution to handle them?

A focus ring is a visible outline given to focusable elements such as buttons and anchor tags. It varies depending on the vendor, but generally it appears as a blue outline around the element to indicate it is currently focused.

In the past, many people specified outline: 0; on the element to remove the focus ring. However, this causes accessibility issues for keyboard users because the focus state may not be clear. When not specified though, it causes an unappealing blue ring to appear around an element.

In recent times, frameworks like Bootstrap have opted to use a more appealing box-shadow outline to replace the default focus ring. However, this is still not ideal for mouse users.

The best solution is an upcoming pseudo-selector :focus-visible which can be polyfilled today with JavaScript. It will only show a focus ring if the user is using a keyboard and leave it hidden for mouse users. This keeps both aesthetics for mouse use and accessibility for keyboard use.


## What is HTML5 Web Storage? Explain localStorage and sessionStorage.

With HTML5, web pages can store data locally within the user’s browser. The data is stored in name/value pairs, and a web page can only access data stored by itself.

Differences between localStorage and sessionStorage regarding lifetime:

    Data stored through localStorage is permanent: it does not expire and remains stored on the user’s computer until a web app deletes it or the user asks the browser to delete it.
    sessionStorage has the same lifetime as the top-level window or browser tab in which the data got stored. When the tab is permanently closed, any data stored through sessionStorage is deleted.

Differences between localStorage and sessionStorage regarding storage scope: Both forms of storage are scoped to the document origin so that documents with different origins will never share the stored objects.

    sessionStorage is also scoped on a per-window basis. Two browser tabs with documents from the same origin have separate sessionStorage data.
    Unlike in localStorage, the same scripts from the same origin can't access each other's sessionStorage when opened in different tabs.

Good to hear

    Earlier, this was done with cookies.

    The storage limit is far larger (at least 5MB) than with cookies and its faster.

    The data is never transferred to the server and can only be used if the client specifically asks for it.


