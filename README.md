# Assignment 8 
This is a small website made with Node.js and Express 5.It introduces study programme and lets visitors test the API routes.

File organization:
/assignment8
 ├─ public/
 │   ├─ index.html
 │   ├─ styles.css
 │   └─ app.js
 ├─ server.js
 ├─ package.json
 ├─ package-lock.json
 ├─ .gitignore
 └─ README.md


QUESTIONS:
1.The 404 fallback must be last.If it is first,it sends a 404 before the real route can handle the request.
Result: Write what you actually observed.
2.next() tells Express to continue.Without itnthe request gets stuck if the middleware does not send a response.
3.I used 201 for subscribe because it means a resource was created successfully.A missing route returns 404 because the requested page or route does not exist.200 response would incorrectly mean success
4.I used process.env.PORT so the server can use a port chosen by the environment.If no port is provided it uses 3000.
5.I did not commit node_modules because it contains installed packages and can be recreated. After cloning, a teammate can run npm install to install the packages from the package files.
6.The page uses relative URLs to contact the same server.This relates to the browser's same-origin policy.
Self-study
process.version gives the Node.js version.
process.uptime() gives how long the server has been running.
res.type("text") sets a plain-text content type.
JSON.stringify(data,null,2) formats JSON with indentation.

Challenges:
1-Understanding Express middleware and next.
2-Putting the routes in the correct order
3-Handling JSON and text responses with Fetch API
4-Fixing Git issues and managing dependencies.