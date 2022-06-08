import api from "zmp-sdk";

export const loadElectronicPostsFromCache = () => new Promise(resolve => {
  api.getStorage({
    keys: ['electronicPosts'],
    success: ({electronicPosts}) => {
      if (electronicPosts) {
        console.log("electronicPosts cache hit!")
        resolve({electronicPosts})
      } else {
        console.log("electronicPosts cache miss!")
      }
      resolve([])
    },
    fail: (error) => {
      console.log('Failed to load electronics from cache. Details: ', error)
      resolve([])
    }
  })
})

export const loadhouseItemPostsFromCache = () => new Promise(resolve => {
  api.getStorage({
    keys: ['houseItemPosts'],
    success: ({houseItemPosts}) => {
      if (houseItemPosts) {
        console.log("houseItemPosts cache hit!")
        resolve({houseItemPosts})
      } else {
        console.log("houseItemPosts cache miss!")
      }
      resolve([])
    },
    fail: (error) => {
      console.log('Failed to load house items from cache. Details: ', error)
      resolve([])
    }
  })
})

export const saveElectronicPostsToCache = async electronicPosts => {
  await api.setStorage({
    data: {electronicPosts},
    fail: (error) =>
      console.log("Failed to save electrics to cache. Details: ", error),
  });
  return electronicPosts;
};

export const saveHouseItemPostsToCache = async houseItemPosts => {
  await api.setStorage({
    data: {houseItemPosts},
    fail: (error) =>
      console.log("Failed to save house items to cache. Details: ", error),
  });
  return houseItemPosts;
};

export const loadUserFromCache = () =>
  new Promise((resolve) => {
    api.getStorage({
      keys: ["user"],
      success: ({user}) => {
        if (user) {
          resolve(user);
        }
        resolve();
      },
      fail: (error) => {
        console.log("Failed to load user from cache. Details: ", error);
        resolve();
      },
    });
  });

export const saveUserToCache = async (user) => {
  await api.setStorage({
    data: {user},
    fail: (error) =>
      console.log("Failed to save user to cache. Details: ", error),
  });
  return user;
};

export const saveMessagesToCache = async m => {
  await api.setStorage({
    data: {messages: m},
    fail: (error) =>
      console.log("Failed to save messages to cache. Details: ", error),
  });
  return m;
};

export const loadMessagesFromCache = () => new Promise(resolve => {
  console.log("loadMessagesFromCache")
  api.getStorage({
    keys: ['messages'],
    success: (m) => {
      if (m.messages) {
        console.log("[messages] cache hit!")
        resolve(m)
      } else {
        console.log("[messages] cache miss!")
      }
      resolve([])
    },
    fail: (error) => {
      console.log('Failed to load messages from cache. Details: ', error)
      resolve([])
    }
  })
})

export const removeFromCache = async (key) => {
  await api.removeStorage({
    keys: [key],
    success: (data) => {
      const {errorKeys} = data;
      console.log("remove " + key + " in cache successfully: "  + errorKeys)
    },
    fail: (error) => {
      console.log(error);
    }
  });
};