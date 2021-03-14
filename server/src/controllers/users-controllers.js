import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

import userModel from '../models/user-model.js';

export const getUserByUserName = (req, res) => {
  const userName = req.params.username;

  res.json({ userName });
};

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userName, email, password } = req.body;
  const hashedPassword = await generateHashedPassword(password);

  const user = new userModel({
    userName,
    email,
    password: hashedPassword,
    valid: {
      url: generateValidUrl(),
    },
  });

  await user.save().then((user) => {
    return res.status(200).json({ user });
  }).catch((error) => {
    return res.status(400).json({ error });
  });
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).exec();
  
  if(user) {
    const match = await comparePassword(password, user.password);
    
    if(match){
      return res.status(200).json({ user, message: 'login success!' });
    }

    return res.status(400).json({ message: 'Password or email is incorrect.' });
  }

  return res.status(400).json({ message: 'The email you entered is not registered.' });
};

export const createSuperman = async (env) => {
  const superman = await userModel.findOne({ email: env.SUPERMAN_EMAIL });

  if (superman) {
    console.log('🦸 Superman is ready for duty!');
  } else {
    console.log('🦸 Superman has never been here!\n✨ Superman is being created...');
    const newSuperman = new userModel({
      userName: env.SUPERMAN_USERNAME,
      email:  env.SUPERMAN_EMAIL,
      password: env.SUPERMAN_PASSWORD,
      valid: {
        url: '/',
        validationCheck: env.SUPERMAN_VALID
      },
      role: env.SUPERMAN_ROLE
    });
    
    await newSuperman.save().then((superman) => {
      console.log('🦸 Superman was created!\n', superman);
    }).catch((error) => {
      console.log('🔥 An error was encountered while creating Superman.\n', error)
    });
  }
};

const generateHashedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 8).then((hash) => {
    return hash;
  });
  
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword).then((res) => {
    return res;
  });

  return result;
};

const generateValidUrl = () => {
  return uuidv4();
};
