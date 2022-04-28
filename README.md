# Firenode
Full stack web application that visualizes a wildfire detection mesh network built with IEEE 802.15.4

<img width="958" alt="firenode1" src="https://user-images.githubusercontent.com/48901384/165799365-76d7a8ae-aef0-4b43-81c5-bf7d3c19c182.png">
<img width="956" alt="firenode2" src="https://user-images.githubusercontent.com/48901384/165799379-3198f39a-8725-414d-8d7a-bb5740633488.png">


## Installation

1. Clone this repository
```
git clone git@github.com:whoistamir/firenode.git
```

2. Open a terminal, navigate to the project directory, and type
```
npm install
```

3. Navigate to the backend directory and start up Docker container for your database
```
cd backend/
docker-compose up -d
```

4. Navigate back to the main project directory and start the frontend and backend
```
cd ../
npm start
```

