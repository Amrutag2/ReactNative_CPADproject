const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./chatapp-35fe8-firebase-adminsdk-1o07w-9a845ae32a.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chatapp-35fe8-default-rtdb.firebaseio.com',
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Firebase Realtime Database reference
const db = admin.database();

// API to save user details
app.post('/save-user', async (req, res) => {
  const { userId, username } = req.body;

  if (!userId || !username) {
    return res.status(400).send({ success: false, message: 'userId and username are required' });
  }

  try {
    const userRef = db.ref(`users/${userId}`);
    await userRef.set({
      userId,
      username,
    });

    res.status(200).send({ success: true, message: 'User saved successfully' });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Error saving user', error: error.message });
  }
});

// API to send a message
app.post('/send-message', async (req, res) => {
  const { userId, username, text, receiverId } = req.body;

  if (!userId || !username || !text) {
    return res.status(400).send({ success: false, message: 'userId, username, and text are required' });
  }

  try {
    const chatRef = db.ref('messages').push();
    await chatRef.set({
      senderId: userId,
      senderName: username,
      receiverId: receiverId || 'public', // Optional receiverId, defaults to 'public' for group messages
      text,
      timestamp: Date.now(),
    });

    res.status(200).send({ success: true, id: chatRef.key });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Error sending message', error: error.message });
  }
});

// API to get messages (optionally filtered by sender and receiver)
app.get('/get-messages', async (req, res) => {
  const { userId, receiverId } = req.query;

  try {
    const messagesRef = db.ref('messages');
    const snapshot = await messagesRef.once('value');
    const messages = [];

    snapshot.forEach((childSnapshot) => {
      const message = childSnapshot.val();

      // Filter messages by sender and receiver if specified
      if (
        (!userId || message.senderId === userId) &&
        (!receiverId || message.receiverId === receiverId || message.receiverId === 'public')
      ) {
        messages.push({ id: childSnapshot.key, ...message });
      }
    });

    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send({ success: false, message: 'Error fetching messages', error: error.message });
  }
});

// API to get all users
app.get('/get-users', async (req, res) => {
  try {
    const usersRef = db.ref('users');
    const snapshot = await usersRef.once('value');
    const users = [];

    snapshot.forEach((childSnapshot) => {
      users.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ success: false, message: 'Error fetching users', error: error.message });
  }
});

app.post('/add-book', async (req, res) => {
  const { bookId, bookName } = req.body;

  if (!bookId || !bookName) {
      return res.status(400).send({ message: 'Book ID and Book Name are required' });
  }

  try {
      const bookRef = db.ref('books/' + bookId);
      await bookRef.set({ bookId, bookName });
      res.status(200).send({ success: true, message: 'Book added successfully' });
  } catch (error) {
      res.status(500).send({ message: 'Error adding book', error: error.message });
  }
});

app.get('/get-books', async (req, res) => {
  try {
      const booksRef = db.ref('books');
      const snapshot = await booksRef.once('value');
      const books = [];
      snapshot.forEach((childSnapshot) => {
          books.push({ bookId: childSnapshot.key, ...childSnapshot.val() });
      });

      res.status(200).send(books);
  } catch (error) {
      res.status(500).send({ message: 'Error fetching books', error: error.message });
  }
});

app.post('/issue-book', async (req, res) => {
  const { userId, bookId, dateOfIssue, returnDate } = req.body;

  if (!userId || !bookId || !dateOfIssue || !returnDate) {
      return res.status(400).send({ message: 'All fields are required' });
  }

  try {
      const issuedBooksRef = db.ref('issuedBooks').push();
      await issuedBooksRef.set({
          userId,
          bookId,
          dateOfIssue,
          returnDate,
      });

      res.status(200).send({ success: true, message: 'Book issued successfully' });
  } catch (error) {
      res.status(500).send({ message: 'Error issuing book', error: error.message });
  }
});

app.get('/get-issued-books', async (req, res) => {
  try {
      const issuedBooksRef = db.ref('issuedBooks');
      const snapshot = await issuedBooksRef.once('value');
      const issuedBooks = [];
      snapshot.forEach((childSnapshot) => {
          issuedBooks.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });

      res.status(200).send(issuedBooks);
  } catch (error) {
      res.status(500).send({ message: 'Error fetching issued books', error: error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
