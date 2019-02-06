import { getSecret } from './secrets'
import Comment from './models/comment'
import Todo from './models/todo'
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;

mongoose.connect(getSecret('dbUri'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

router.get('/comments', (req, res) => {
  Comment.find((err, comments) => {
    if (err) return res.json({ success: false, error: err});
    return res.json({ success: true, data: comments });
  });
});

router.get('/todos', (req, res) => {
  Todo.find((err, todos) => {
    if (err) return res.json({ success: false, error: err});
    return res.json({ success: true, data: todos });
  });
});

router.post('/todos', (req, res) => {
  const todo = new Todo();
  console.log('Post', req.body);
  const { text } = req.body;
  if (!text) {
    return res.json({
      success: false,
      error: 'You must provide text'
    });
  }
  todo.text = text;
  todo.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true })
  });
});

router.post('/comments', (req, res) => {
  const comment = new Comment();
  const { author, text } = req.body;
  if (!author || !text) {
    return res.json({
      success: false,
      error: 'You must provide an author and comment'
    });
  }
  comment.author = author;
  comment.text = text;
  comment.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true })
  });
});

router.put('/comments/:commentId', (req, res) => {
  const { commentId } = req.params;
  if (!commentId) {
    return res.json({ success: false, error: 'No comment id provided'})
  }
  Comment.findById(commentId, (error, comment) => {
    if (error) return res.json({ success: false, error });
    const { author, text } = req.body;
    if (author) comment.author = author;
    if (text) comment.text = text;
    comment.save(error => {
      if (error) return res.json ({ success: false, error });
      return res.json({ success: true });
    })
  })
})

router.delete('/comments/:commentId', (req, res) => {
  const { commentId } = req.params;
  if (!commentId) {
    return res.json({ success: false, error: 'No comment id provided' });
  }
  Comment.remove({ _id: commentId }, (error, comment) => {
    if (error) return res.json({ success: false, error });
    return res.json({ success: true })
  })
})

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
