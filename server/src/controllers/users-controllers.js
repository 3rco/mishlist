import userModel from '../models/user-model.js';

export const getUserByUserName = (req, res) => {
  const userName = req.params.username;

  res.json({ userName });
}

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
}