
const User = require('../models/User'); // Make sure the correct path to your User model is used

exports.addUser = async (req, res) => {
  const { name, username, email, password, role } = req.body;
    try {
       const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }
    const newUser = new User({ name, username, email, password, role });
    const savedUser = await newUser.save();
    const { password: _, ...userDetails } = savedUser.toObject(); 
    res.status(201).json(userDetails);

  } catch (error) {
    console.error('Error adding user:', error); 
    res.status(500).json({ message: 'Error adding user', error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name username role');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

exports.Login =async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in user' });
  }
};
exports.DeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};
