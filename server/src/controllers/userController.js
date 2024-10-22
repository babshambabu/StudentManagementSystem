
const User = require('../models/User'); // Make sure the correct path to your User model is used
// Function to add a user
exports.addUser = async (req, res) => {
  const { name, username, email, password, role } = req.body;
  
  try {
    // Check if a user with the same email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    

    // Create the new user
    const newUser = new User({ name, username, email, password, role });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with the new user's details, excluding the password
    const { password: _, ...userDetails } = savedUser.toObject(); // Exclude password from the response
    res.status(201).json(userDetails);

  } catch (error) {
    console.error('Error adding user:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error adding user', error });
  }
};


// Function to add a user
// exports.addUser = async (req, res) => {
//   const { name, username, email, password, role } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
//     const newUser = new User({ name, username, email, password: hashedPassword, role });
//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding user', error });
//   }
// };


// Function to get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name username role');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};
