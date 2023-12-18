## YOGA CLASS ENROLMENT FORM
This project demonstrates a simple yoga class admission form using React and Node.js. 
It allows users to enter their personal information, choose their preferred batch, and submit their enrollment details. 
The backend API validates the submitted data, performs payment processing (mocked for now), and stores the enrolled user information in the database.

### Important: 
> There is initial delay of about **30 seconds** for the backend to respond for the first time because the hosted platform takes time to start the server initially(hosted under free tier plan on render platform).
for more detils, look at the _**NOTE**_ section i.e. at the bottom of this readme file.

## Technology Stack
- Frontend: `React`
- Backend: `Node.js`, `Express.js`
- Database: `MongoDB (or NoSQL)`

## Installation
For installation in local environment, _bash_/run below commands,
1. Clone the repository,  
   >``git clone https://github.com/m-ville/Yoga-Enroll-Form_v1``
2. Install dependencies,  
   >``cd yoga-class-admission-form``  
   >``npm install``
3. Backend Setup (Node.js and MongoDB)  
   a. Configure MongoDB connection in `backend/server.js`.  
   b. Start the backend server:   
      >``cd backend``  
      >``npm run start``
4. Frontend Setup (React)  
   a. Start the frontend server:  
      >``cd frontend``  
      >``npm start``


## Tasks/operations handled
**Frontend hosted URL:** https://yoga-enrollment-form.vercel.app/  
**Possible response :**   
| **Tasks/operations**                                     |     **Expected response**      |  
|     :---------                                           |     :---------------:      |
| 1. For completely new users(i.e. new email)              |    Details of the user & payment confirmation is displayed on a toast |  
| 2. For existing user but need to pay for current month   | Updated details of user(except name and email) & payment confirmation is displayed on a toast |  
| 3. For existing user and already paid for current month  | Details of user from DB & payment confirmation is displayed on a toast |  

## Demo/Usuage
1. **Enrolling a completely new user:** In below image, a new user is created after filling the form and clicking ``Enroll Now`` button. Also, the response from backend is dispayed on a toast at top-right corner of the
   screen.
    <br> 
   > ![Screenshot (767)](https://github.com/m-ville/Yoga-Enroll-Form_v1/assets/94619482/cbf00578-46c7-4053-a27b-dbf98bf6f231)  
   >  _**Data persisted in DB,**_
   > ![Screenshot 2023-12-18 223854](https://github.com/m-ville/Yoga-Enroll-Form_v1/assets/94619482/53bed5d9-d2da-4d8b-afec-818aa7ce7a2b)

3. **Enrolling an already existing user(i.e. email already exists in DB) but need to pay for current month:** In the below image, after entering users old or updated details with the earlier email, it gets reflected in DB.
   i.e. user can update their `batch`, `age`, `phone no` while paying for the first time for the current month.
    <br> 
   > _**Last payment is of _october_ in the below image, so while paying for the current month, users's `batch` and `age` got updated as well:**_
   > ![Screenshot 2023-12-18 223927](https://github.com/m-ville/Yoga-Enroll-Form_v1/assets/94619482/eb21255b-8371-4cbf-83c2-827c15ca8d6f)
   > _**Entering upadted details of user(except name and email):**_
   > ![Screenshot 2023-12-18 224022](https://github.com/m-ville/Yoga-Enroll-Form_v1/assets/94619482/0a05123b-7116-49d8-b230-82206e2e2545)
   > _**Upadted data got reflected in DB:**_
   > ![Screenshot 2023-12-18 224050](https://github.com/m-ville/Yoga-Enroll-Form_v1/assets/94619482/8adb7f61-f0b6-4f3c-9621-8c885b9a2c0d)

5. **Enrolling an already existing user(i.e. email already exists in DB) and he/she has already paid for current month:** In the below image, for alreday existing user who earlier paid for the current month, we get
   response from backend saying that you've already paid for current month. Here, no data gets updated in the DB, only the response is shown in the toast.
    <br> 
   > ![Screenshot 2023-12-18 230640](https://github.com/m-ville/Yoga-Enroll-Form_v1/assets/94619482/321cf669-5705-49a7-a0c8-b30aabe9da37)


# NOTE:
1. Please wait for **30 seconds** after hitting ``Enroll Now`` button because backend is hosted on a free tier plan, thus there is initial delay of starting the server is around **30 seconds**
2. OR you can hit the backend hosted URL prior to filling the form and hitting ``Enroll Now`` button. This will start the server and thus this delay will not freeze the page.
   > _**Backend URL**_ : https://yoga-enrollment-form.onrender.com/   
   Simply paste the above url in browser and hit enter and wait till you get a message saying ``Cannot GET /``. After this message, you can perform the above opertions with minimal delay.



