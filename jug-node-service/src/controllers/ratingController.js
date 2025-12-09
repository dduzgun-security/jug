import ratingClient from '../grpc/ratingClient.js';
import userClient from '../grpc/userClient.js';

export const getAllRatings = async (req, res) => {
  try {
    // Call Go rating service via gRPC
    ratingClient.listRatings({}, async (error, response) => {
      if (error) {
        console.error('Error calling rating service:', error);
        return res.status(500).json({ error: 'Failed to fetch ratings' });
      }

      // Convert protobuf ratings to plain objects
      const ratings = response.getRatingsList().map(rating => ({
        id: rating.getId(),
        user_id: rating.getUserId(),
        restaurant: rating.getRestaurant(),
        cheese_squeakiness: rating.getCheeseSqueakiness(),
        gravy_thickness: rating.getGravyThickness(),
        fries_crispiness: rating.getFriesCrispiness(),
        size: rating.getSize(),
        comments: rating.getComments(),
        created_at: rating.getCreatedAt()
      }));

      // Enrich ratings with user data from Java user service
      const ratingsWithUsers = await Promise.all(
        ratings.map(async (rating) => {
          return new Promise((resolve) => {
            userClient.getUser({ user_id: rating.user_id }, (err, userResponse) => {
              if (err) {
                console.error('Error fetching user:', err);
                resolve({ ...rating, user: null });
              } else {
                const user = userResponse.getUser();
                const userJson = {
                  id: user.getId(),
                  first_name: user.getFirstName(),
                  last_name: user.getLastName(),
                  email: user.getEmail(),
                  age: user.getAge(),
                  phone_number: user.getPhoneNumber(),
                  status: user.getStatus()
                };
                resolve({ ...rating, user: userJson });
              }
            });
          });
        })
      );

      res.json({ ratings: ratingsWithUsers });
    });
  } catch (error) {
    console.error('Error in getAllRatings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createRating = async (req, res) => {
  try {
    const ratingData = req.body;

    ratingClient.createRating(ratingData, (error, response) => {
      if (error) {
        console.error('Error creating rating:', error);
        return res.status(500).json({ error: 'Failed to create rating' });
      }

      // Convert protobuf response to JSON
      const rating = response.getRating();
      const ratingJson = {
        id: rating.getId(),
        user_id: rating.getUserId(),
        restaurant: rating.getRestaurant(),
        cheese_squeakiness: rating.getCheeseSqueakiness(),
        gravy_thickness: rating.getGravyThickness(),
        fries_crispiness: rating.getFriesCrispiness(),
        size: rating.getSize(),
        comments: rating.getComments(),
        created_at: rating.getCreatedAt()
      };

      res.status(201).json({ rating: ratingJson });
    });
  } catch (error) {
    console.error('Error in createRating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRatingById = async (req, res) => {
  try {
    const { id } = req.params;

    ratingClient.getRating({ rating_id: id }, (error, ratingResponse) => {
      if (error) {
        console.error('Error fetching rating:', error);
        return res.status(404).json({ error: 'Rating not found' });
      }

      // Convert protobuf rating to JSON
      const rating = ratingResponse.getRating();
      const ratingJson = {
        id: rating.getId(),
        user_id: rating.getUserId(),
        restaurant: rating.getRestaurant(),
        cheese_squeakiness: rating.getCheeseSqueakiness(),
        gravy_thickness: rating.getGravyThickness(),
        fries_crispiness: rating.getFriesCrispiness(),
        size: rating.getSize(),
        comments: rating.getComments(),
        created_at: rating.getCreatedAt()
      };

      // Fetch associated user
      userClient.getUser({ user_id: ratingJson.user_id }, (err, userResponse) => {
        if (err) {
          console.error('Error fetching user:', err);
          return res.json({ ...ratingJson, user: null });
        }

        const user = userResponse.getUser();
        const userJson = {
          id: user.getId(),
          first_name: user.getFirstName(),
          last_name: user.getLastName(),
          email: user.getEmail(),
          age: user.getAge(),
          phone_number: user.getPhoneNumber(),
          status: user.getStatus()
        };

        res.json({ ...ratingJson, user: userJson });
      });
    });
  } catch (error) {
    console.error('Error in getRatingById:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
