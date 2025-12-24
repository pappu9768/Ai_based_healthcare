frontend=> go client folder(./client) 
        => create. env file root file(./client) and add this 'VITE_API_BASE_URL=http://localhost:8080/api/v1/auth'
        => npm install (To install all necessary dependencies)

backend=> same as it is like frontend but
       => create one .env file(yes same name as it is) root file(./server)
           => add MONGO_URI
           => PORT = "any" example = 8080
           => SECRET_KEY = "random name" example = "Web-12345"
           => Bonus - npm i -D nodemon and then you can use "npm run dev"

and at last run both folder by using "npm run dev" command
