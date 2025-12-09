import userClient from '../grpc/userClient.js';

export const getAllUsers = async (req, res) => {
  try {
    userClient.listUsers({}, (error, response) => {
      if (error) {
        console.error('Error calling user service:', error);
        return res.status(500).json({ error: 'Failed to fetch users' });
      }

      // Convert protobuf response to JSON
      const users = response.getUsersList().map(user => ({
        id: user.getId(),
        first_name: user.getFirstName(),
        last_name: user.getLastName(),
        email: user.getEmail(),
        age: user.getAge(),
        phone_number: user.getPhoneNumber(),
        status: user.getStatus()
      }));

      res.json({ users });
    });
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createUser = async (req, res) => {
  try {
    const userData = req.body;

    userClient.createUser(userData, (error, response) => {
      if (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Failed to create user' });
      }

      // Convert protobuf response to JSON
      const user = response.getUser();
      const userJson = {
        id: user.getId(),
        first_name: user.getFirstName(),
        last_name: user.getLastName(),
        email: user.getEmail(),
        age: user.getAge(),
        phone_number: user.getPhoneNumber(),
        status: user.getStatus()
      };

      res.status(201).json({ user: userJson });
    });
  } catch (error) {
    console.error('Error in createUser:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    userClient.getUser({ user_id: id }, (error, response) => {
      if (error) {
        console.error('Error fetching user:', error);
        return res.status(404).json({ error: 'User not found' });
      }

      // Convert protobuf response to JSON
      const user = response.getUser();
      const userJson = {
        id: user.getId(),
        first_name: user.getFirstName(),
        last_name: user.getLastName(),
        email: user.getEmail(),
        age: user.getAge(),
        phone_number: user.getPhoneNumber(),
        status: user.getStatus()
      };

      res.json(userJson);
    });
  } catch (error) {
    console.error('Error in getUserById:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
